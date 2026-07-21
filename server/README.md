# windowsnetboot/server

Host-side server stack for Windows Netboot Build 5. Serves a Windows installation share to WinPE clients over WebSocket, bypassing the need to expose raw SMB through firewalls or NAT.

## Architecture

```
WinPE client
    │  WebSocket (port 8765)
    ▼
smb-ws-server.js   ← WebSocket → TCP proxy (Node.js)
    │  raw TCP (port 4445)
    ▼
smb_server.py      ← impacket SMBv2 server
    │
    ▼
win/               ← Windows installation files
```

The WinPE client connects via WebSocket. `smb-ws-server.js` tunnels the raw SMB bytes to the local Python SMB server, which serves the `win/` folder as a read-only share named `Files`.

## Requirements

- Node.js 18+
- Python 3.8+
- `impacket` Python package

```
pip install impacket
npm install
```

## Setup

1. Place your Windows installation files in a `win/` folder next to the server files.

2. Edit `config.json` if needed:

```json
{
  "ip": "0.0.0.0",
  "port": 8765,
  "smb_host": "127.0.0.1",
  "smb_port": 4445
}
```

| Key | Description |
|---|---|
| `ip` | WebSocket listen address |
| `port` | WebSocket listen port |
| `smb_host` | Address of the local SMB server (keep `127.0.0.1`) |
| `smb_port` | Port of the local SMB server (keep `4445`) |

## Running

Start the SMB server first, then the WebSocket proxy:

```bash
python smb_server.py
node smb-ws-server.js
```

The SMB server must be running before the WebSocket proxy starts accepting connections.

## WinPE Client

In the WinPE installer, connect to your server's IP on port `8765` (WebSocket). The installer will map the share `\\127.0.0.1\Files` locally and launch Windows Setup from it.

## Notes

- `smb_server.py` binds to `127.0.0.1` only and is not directly exposed to the network.
- The `win/` share is read-only.
- No SMB credentials are required by default (`smbuser` / `smbuser` if prompted).
- arm64 is not supported.
