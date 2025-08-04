# Table of contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Troubleshooting](#troubleshooting)

## Overview
**Windows Netboot** is a simple way to install Windows over the network without any large isos.

At the moment, it does **NOT** support arm64.


## Getting Started
To boot into the **Windows Netboot** installer,

we offer 2 ways to do it.

1. [Netboot.xyz](https://github.com/rtedpro-cpu/windowsnetboot/blob/main/guides/netboot.xyz/README.md) (**Recommended**)
2. [WinPE ISO](https://github.com/rtedpro-cpu/windowsnetboot/releases)

The WinPE ISO is about ~300 MB in size.


Look for builds with an iso or starting with **Build** if you wanna boot from the ISO.



Once booted in **Windows Netboot** installer,

a window with the name **PE Network** will appear.

If you use **DHCP**, click on OK.

If you use **Static**, configure the Static IP Config and DNS. The timezone server can be left blank.


After that, type in one of the IPs/Domains of the mirrors

```bash
161.97.166.249 - Germany
152.53.211.143 - United States of America
```

Then you will be prompted to enter a mirror/share name, choose one of these.

```bash
win10 - Windows 10 LTSC 2021 x64
win11 - Windows 11 LTSC 24H2 x64
server2022 - Windows Server 2022 x64
```


After entering, the windows setup will appear and continue usually.



## Troubleshooting
Please create a issue and describe the issue you have.
