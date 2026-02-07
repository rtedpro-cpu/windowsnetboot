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

click on **Open PE Network**

a window with the name **PE Network** will appear.

If you use **DHCP**, click on OK.

If you use **Static**, configure the Static IP Config and DNS. The timezone server can be left blank.


After that, type in one of the IPs/Domains of the mirrors

```bash
45.202.102.15 - United States
```

Then you will be prompted to enter a mirror/share name, choose one of these.

```bash
win10ltsc - Windows 10 LTSC 2021 x64
```


After entering, click next and click on the button to map **F:**.

If required, enter a username and a password. 

In this case it is not required.


It should now suceed and click OK on the popup and continue to the next step.

Depending if it suceeded or errored, you can now click on the button to open Windows Setup.



## Troubleshooting
Please create a issue and describe the issue you have.
