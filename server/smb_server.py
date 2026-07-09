"""
smb_server.py — host-side impacket SMBv2 server
Serves the win/ folder on localhost:4445 for the WS proxy to forward to.

Run this BEFORE starting smb-ws-server.js:
    python smb_server.py
"""

import logging
import os
import sys
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("smb-server")

def main():
    try:
        from impacket.smbserver import SimpleSMBServer
    except ImportError:
        log.error("impacket not installed — run: pip install impacket")
        sys.exit(1)

    share_path = str(Path(__file__).parent / "win")
    if not os.path.exists(share_path):
        log.error("win/ folder not found at %s", share_path)
        sys.exit(1)

    server = SimpleSMBServer(listenAddress="127.0.0.1", listenPort=4445)
    server.addShare("Files", share_path, readOnly="yes")
    server.setSMBChallenge("")
    server.setSMB2Support(True)
    server.setLogFile("")

    log.info("SMBv2 server on 127.0.0.1:4445 → %s", share_path)
    log.info("Share: \\\\127.0.0.1\\Files")

    try:
        server.start()
    except PermissionError:
        log.error("Cannot bind port 4445 — try running as Administrator")
        sys.exit(1)

if __name__ == "__main__":
    main()
