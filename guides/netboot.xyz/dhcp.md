After booting into the **Netboot.xyz** menu,

go to the following option.

```bash
IPXE Shell
```

In the shell, enter the following line.

```bash
dhcp
```

After configuring the network, enter the following line to boot the installer.

```bash
boot https://tinyurl.com/winbootpe
```

If you get an unsupported error, you will have to type the following long line.

```bash
chain --autofree https://github.com/rtedpro-cpu/windowsnetboot/raw/refs/heads/main/release/custom/boot.ipxe
```
