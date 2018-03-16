---
title: Arch Linux 部分问题解决方法
date: 2018-02-13 22:38:10
tags:
    - linux
    - archlinux
    - troubleshoots
---

## Error "radeon: Failed to allocate virtual address for buffer:" when launching GL application
This error is given when the power management in the kernel driver is running. You can overcome this error by appending *radeon.runpm=0* to the kernel parameters in the bootloader

See[Error_.22radeon:_Failed_to_allocate_virtual_address_for_buffer:.22_when_launching_GL_application](https://wiki.archlinux.org/index.php/PRIME#Error_.22radeon:_Failed_to_allocate_virtual_address_for_buffer:.22_when_launching_GL_application)

## Fix Steam libGL Error on Arch Linux

```bash
find ~/.steam/root/ \( -name "libgcc_s.so*" -o -name "libstdc++.so*" -o -name "libxcb.so*" -o -name "libgpg-error.so*" \) -print -delete
```

If the above command does not work, run the above command again and then run the following command.

```bash
find ~/.local/share/Steam/ \( -name "libgcc_s.so*" -o -name "libstdc++.so*" -o -name "libxcb.so*" -o -name "libgpg-error.so*" \) -print -delete
```

## Use notify-send(xorg program) in cron
```bash
DISPLAY=:0 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus notify-send 233 -u critical
```
