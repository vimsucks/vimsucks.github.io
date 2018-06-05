---
title: UNP 习题 1.5
date: 2018-06-05 15:16:04
tags:
    - UNP
---
题目：按下述步骤修改图 1-9 中的程序。首先，把赋与 sin_port 的端口从 13 改为 9999。然后，把 write 的单一调用改为循环调用，每次写出结果字符串的一个字节。编译修改后的服务器程序并在后台启动执行。接着修改前一道习题中的客户程序（它在终止前输出计数器值），把赋于 sin_port 的端口号从 13 改为 9999.启动这个客户端程序，指定运行修改后的服务器程序的主机的 IP 地址作为命令行参数。客户程序计数器的输出值是多少？如果可能，在不同主机上运行这个客户与服务器程序。

服务端代码：

```c
// daytimetcpsrv.c

#include	"unp.h"
#include	<time.h>

int
main(int argc, char **argv)
{
	int					listenfd, connfd;
	struct sockaddr_in	servaddr;
	char				buff[MAXLINE];
	time_t				ticks;

	listenfd = Socket(AF_INET, SOCK_STREAM, 0);

	bzero(&servaddr, sizeof(servaddr));
	servaddr.sin_family      = AF_INET;
	servaddr.sin_addr.s_addr = htonl(INADDR_ANY);
	servaddr.sin_port        = htons(9999);	/* daytime server */

	Bind(listenfd, (SA *) &servaddr, sizeof(servaddr));

	Listen(listenfd, LISTENQ);

	for ( ; ; ) {
		connfd = Accept(listenfd, (SA *) NULL, NULL);

        ticks = time(NULL);
        snprintf(buff, sizeof(buff), "%.24s\r\n", ctime(&ticks));
        int i = 0;
        for ( ; i < strlen(buff); ++i) {
            Write(connfd, buff+i, 1);
        }

		Close(connfd);
	}
}
```


客户端：

```c
//daytimetcpcli.c

#include	"unp.h"

int
main(int argc, char **argv)
{
	int					sockfd, n;
	char				recvline[MAXLINE + 1];
	struct sockaddr_in	servaddr;

	if (argc != 2)
		err_quit("usage: a.out <IPaddress>");

	if ( (sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0)
		err_sys("socket error");

	bzero(&servaddr, sizeof(servaddr));
	servaddr.sin_family = AF_INET;
	servaddr.sin_port   = htons(9999);	/* daytime server */
	if (inet_pton(AF_INET, argv[1], &servaddr.sin_addr) <= 0)
		err_quit("inet_pton error for %s", argv[1]);

	if (connect(sockfd, (SA *) &servaddr, sizeof(servaddr)) < 0)
		err_sys("connect error");

    int readCount = 0;
	while ( (n = read(sockfd, recvline, MAXLINE)) > 0) {
		recvline[n] = 0;	/* null terminate */
		if (fputs(recvline, stdout) == EOF)
			err_sys("fputs error");
        ++readCount;
	}
    printf("read times: %d\n", readCount);

	if (n < 0)
		err_sys("read error");

	exit(0);
}
```


将服务端部署在 vps 上后，运行客户端，输出：

```bash
$./daytimetcpcli xxx.xxx.xxx.xxx
Tue Jun  5 03:22:15 2018
read times: 1
```

可见，尽管服务端调用了 26 次 write，但客户端仅仅 read 了 1 次便读取了所有数据

而将服务端部署在与客户端相同的主机上时，运行客户端则输出：

```bash
# 假设本机 IP 为192.168.1.100
./daytimetcpcli 192.168.1.100
Tue Jun  5 15:48:56 2018
read times: 15
```

tracepath 一下可得知：

```bash
tracepath 192.168.1.100
 1:  localhost                                                 0.091ms reached
     Resume: pmtu 65535 hops 1 back 1 
```

可见数据包没有经过路由器

由此推测，当服务端与客户端不处于同一主机时，TCP 报文经过了路由器，途中发生几个报文被合并为了较大的报文（当然长度也是小于 MSS，Maximum Segment Size的），再由客户端接收，所有第一次执行时，read 的次数仅为 1 次

而第二次执行时，数据包直接被送达本机，报文被合并的次数并不多，所有 read 的次数要比第一次大得多
