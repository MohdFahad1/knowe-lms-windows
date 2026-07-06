import { app, BrowserWindow } from "electron";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;

let server;

async function startServer() {
  const appServer = express();

  appServer.use(express.static(path.join(__dirname, "../dist")));

  appServer.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });

  return new Promise((resolve) => {
    server = appServer.listen(4173, "127.0.0.1", () => {
      console.log("Local server started on http://127.0.0.1:4173");
      resolve();
    });
  });
}

async function createWindow() {
  if (!isDev) {
    await startServer();
  }

  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    await win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    await win.loadURL("http://127.0.0.1:4173");
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  server?.close();

  if (process.platform !== "darwin") {
    app.quit();
  }
});