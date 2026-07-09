// smb-ws-server.js
// WebSocket TCP proxy — tunnels raw SMB bytes between WinPE clients
// and the local Python impacket SMB server.

import { WebSocketServer } from "ws";
import net from "net";
import fs from "fs";
import { fileURLToPath } from "url";

const CFG_PATH = fileURLToPath(new URL("./config.json", import.meta.url));

function loadConfig() {
  const c = JSON.parse(fs.readFileSync(CFG_PATH, "utf8"));
  return {
    ip:       c.ip       ?? "0.0.0.0",
    port:     c.port     ?? 8765,
    smb_host: c.smb_host ?? "127.0.0.1",
    smb_port: c.smb_port ?? 4445,
  };
}

const cfg = loadConfig();

const wss = new WebSocketServer({ host: cfg.ip, port: cfg.port });

wss.on("connection", (ws, req) => {
  const addr = req.socket.remoteAddress;
  console.log(`[+] WS client connected: ${addr}`);

  const conns = new Map(); // conn_id -> net.Socket

  ws.on("message", (data, isBinary) => {
    if (!isBinary) {
      let msg;
      try { msg = JSON.parse(data); } catch { return; }

      if (msg.type === "CONNECT") {
        const { conn_id } = msg;
        const tcp = net.createConnection({ host: cfg.smb_host, port: cfg.smb_port });
        conns.set(conn_id, tcp);

        tcp.on("connect", () => {
          ws.send(JSON.stringify({ type: "CONNECTED", conn_id }));
        });

        tcp.on("data", (chunk) => {
          const hdr = Buffer.allocUnsafe(4);
          hdr.writeUInt32LE(conn_id, 0);
          if (ws.readyState === ws.OPEN)
            ws.send(Buffer.concat([hdr, chunk]));
        });

        tcp.on("close", () => {
          conns.delete(conn_id);
          if (ws.readyState === ws.OPEN)
            ws.send(JSON.stringify({ type: "DISCONNECT", conn_id }));
        });

        tcp.on("error", (e) => {
          console.error(`[!] TCP ${conn_id}: ${e.message}`);
          conns.delete(conn_id);
          if (ws.readyState === ws.OPEN)
            ws.send(JSON.stringify({ type: "ERROR", conn_id, message: e.message }));
        });
      }

      if (msg.type === "DISCONNECT") {
        const tcp = conns.get(msg.conn_id);
        if (tcp) { tcp.destroy(); conns.delete(msg.conn_id); }
      }

    } else {
      // Binary frame: [4 bytes conn_id LE][SMB payload]
      if (data.length < 4) return;
      const conn_id = data.readUInt32LE(0);
      const payload = data.slice(4);
      const tcp = conns.get(conn_id);
      if (tcp) tcp.write(payload);
    }
  });

  ws.on("close", () => {
    console.log(`[-] ${addr} disconnected`);
    conns.forEach(tcp => tcp.destroy());
    conns.clear();
  });

  ws.on("error", (e) => console.error(`[!] WS error: ${e.message}`));
});

wss.on("listening", () => {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║      SMB-over-WS  TCP Proxy              ║");
  console.log("╠══════════════════════════════════════════╣");
  console.log(`║  WS Listen : ${cfg.ip}:${cfg.port}`.padEnd(43) + "║");
  console.log(`║  SMB Target: ${cfg.smb_host}:${cfg.smb_port}`.padEnd(43) + "║");
  console.log("╚══════════════════════════════════════════╝");
});

wss.on("error", (e) => { console.error("[server] Fatal:", e.message); process.exit(1); });
