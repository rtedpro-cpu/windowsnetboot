# Netboot+
Netboot+ aims to add cloud-hosted windows images for user to install without needing to host it themself!


**Goals of Netboot+**

**+** Friendly Custom Installer (for custom images)

**+** Community Images

**+** Automated installer



How to boot manually using IPXE
Navigate to IPXE Shell in Netboot.xyz
Type the following:
```bash
dhcp
```
If you are using dhcp then run the following ^^

If you are using static refer to https://netboot.xyz/docs/booting/ipxe

After that run
```bash
boot https://tinyurl.com/winbootpe
```

If that doesn't work then run
```bash
chain --autofree https://github.com/rtedpro-cpu/windowsnetboot/raw/refs/heads/main/release/custom/boot.ipxe
```


Or boot using the iso in the releases tab. (Starts from b2)


Then when booted in the Windows PE, wait for it to setup networking

after that you can enter in one of these mirrors.

```bash
45.11.189.160 - France, hwhost.fr
23.109.49.148 - Netherlands, Nodecraft
187.33.151.164 - Spain, clouding.io
```

Please use the France one or Spain one if you want Windows 11.

The following available share names are:

```bash
45.11.189.160 - "win" for Windows 10 LTSC x64
45.11.189.160 - "win11" for Windows 11 LTSC x64
23.109.48.148 - "win" for Windows 10 LTSC x64
187.33.151.164 - "win" for Windows 10 LTSC x64
187.33.151.164 - "win" for Windows 11 LTSC x64
```

--------------------------------------------
# Community Mirrors
--------------------------------------------

```bash
http://boot.cruizernw.com.tr/
```


The following available share names are:


```bash
http://boot.cruizernw.com.tr/ - Win10
http://boot.cruizernw.com.tr/ - Win11
```
