const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');

const isDev = process.env['NODE_ENV'] !== 'production';
const isMac = process.platform === 'darwin';

function createWindow() {
  const window = new BrowserWindow({
    height: 600,
    width: isDev ? 800 : 500,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    window.loadURL('http://localhost:4200');
  } else {
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/homework/index.html`),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  if (isDev) {
    window.webContents.openDevTools();
  }

  return window;
}

let mainWindow;
let secondaryWindow;

app.whenReady().then(() => {
  mainWindow = createWindow();
  setCustomMenu();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const menuTemplate = [
  ...(isMac ? [{ role: 'appMenu' }] : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          secondaryWindow = createWindow();
        },
      },
      { role: 'quit' },
    ],
  },
];

// Set the custom menu
function setCustomMenu() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

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

  // Update the other windows as well
  reloadOpenWindows();

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

  // Update the other windows as well
  reloadOpenWindows();

  return updatedOrders;
});

function reloadOpenWindows() {
  for (let window of BrowserWindow.getAllWindows()) {
    window.webContents.send('reload-content');
  }
}

// On macOS, the app should close only on Cmd+Q.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});
