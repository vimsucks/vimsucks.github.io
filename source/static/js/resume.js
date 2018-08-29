var jobIntensions = {
    "default": "Java开发工程师",
    "huawei": "IT应用软件开发工程师实习生",
    "cainiao": "研发工程师JAVA实习生",
    "meili": "后端开发实习生",
    "dianwoda": "Java开发实习生",
    "netease": "Java 开发工程师",
    "ali": "Java 后端开发",
    "microstrategy": "Associate Software Engineer 开发工程师",
    "dianwoda": "Java 开发工程师"
}
var href = window.location.href;
var url = new URL(href);
var company = url.searchParams.get("company")
if (!(company in jobIntensions)) {
    company = "default"
}
$("h2").text(jobIntensions[company])
