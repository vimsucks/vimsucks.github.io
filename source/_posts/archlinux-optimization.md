---
title: Arch Linux 修改优化
date: 2018-02-13 22:28:21
tags:
    - Linux
    - Arch Linux
---

## 禁用 Watchdogs

  添加 `nowatchdog` 到内核启动选项

  并 blacklist `iTCO_wdt` 模块

## 禁用 ARP 以加速 DHCP
   添加 `noarp` 到 `/etc/dhcpd.conf`

   另见[Speed_up_DHCP_by_disabling_ARP_probing](https://wiki.archlinux.org/index.php/Dhcpcd#Speed_up_DHCP_by_disabling_ARP_probing)
