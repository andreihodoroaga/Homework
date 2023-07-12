const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');

const isDev = process.env['NODE_ENV'] !== 'production';
const isMac = process.platform === 'darwin';

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: isDev ? 800 : 500,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/your-app-name/index.html`),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on("get-sculptures", (event, args) => {
  const dataPath = path.join(__dirname, "data", "sculptures.json");
  const sculpturesData = fs.readFileSync(dataPath, "utf-8");
  event.reply("sculptures-data", sculpturesData);
});

// On macOS, the app should close only on Cmd+Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});
