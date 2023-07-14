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

ipcMain.handle("get-sculptures", (event, args) => {
  const dataPath = path.join(__dirname, "data", "sculptures.json");
  const sculpturesData = fs.readFileSync(dataPath, "utf-8");
  return sculpturesData;
});

ipcMain.handle("get-orders", (event, args) => {
  const dataPath = path.join(__dirname, "data", "orders.json");
  const ordersData = fs.readFileSync(dataPath, "utf-8");
  return ordersData;
});

ipcMain.handle('add-order', (event, newOrder) => {
  const dataPath = path.join(__dirname, 'data', 'orders.json');
  const ordersData = fs.readFileSync(dataPath, 'utf-8');
  const orders = JSON.parse(ordersData);

  // Add the new order
  orders.push(newOrder);
  const updatedOrdersData = JSON.stringify(orders, null, 2);
  fs.writeFileSync(dataPath, updatedOrdersData);
  return orders;
});

ipcMain.handle('delete-order', (event, orderIdToDelete) => {
  const dataPath = path.join(__dirname, 'data', 'orders.json');
  const ordersData = fs.readFileSync(dataPath, 'utf-8');
  const orders = JSON.parse(ordersData);

  // Delete the order with the given ID
  const updatedOrders = orders.filter(order => order.id !== orderIdToDelete);
  const updatedOrdersData = JSON.stringify(updatedOrders, null, 2);
  fs.writeFileSync(dataPath, updatedOrdersData);
  return updatedOrders;
});

// On macOS, the app should close only on Cmd+Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});
