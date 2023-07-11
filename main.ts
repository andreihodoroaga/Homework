const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const isDev = process.env['NODE_ENV'] !== 'production';
const isMac = process.platform === 'darwin';

function createWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: isDev ? 800 : 500,
    webPreferences: {
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

// On macOS, the app should close only on Cmd+Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
