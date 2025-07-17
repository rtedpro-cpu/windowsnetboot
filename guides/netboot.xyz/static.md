After booting into the **Netboot.xyz** menu,

go to the following option.

```bash
IPXE Shell
```

In the shell, enter the following lines.

```bash
set net0/ip <ip>
set net0/netmask <netmask>
set net0/gateway <gateway>
set dns <nameserver>
ifopen net0
```

Replace anything in <> with the config provided by **your ISP**.

If you possibly have multiple network interfaces, you may be required to change the number in "**net<number>**"


After configuring the network, enter the following line to boot the installer.

```bash
boot https://tinyurl.com/winbootpe
```

If you get an unsupported error, you will have to type the following long line.

```bash
chain --autofree https://github.com/rtedpro-cpu/windowsnetboot/raw/refs/heads/main/release/custom/boot.ipxe
```
