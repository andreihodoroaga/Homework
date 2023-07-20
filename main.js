const { app, BrowserWindow, ipcMain, Menu } = require('electron');
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
        pathname: path.join(__dirname, `/dist/homework/index.html`),
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
        click: createWindow,
      },
      { role: 'quit' },
    ],
  },
];

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

const handleOrderOperation = async (operation, event, orderData) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'orders.json');
    const ordersData = fs.readFileSync(dataPath, 'utf-8');
    const orders = JSON.parse(ordersData);

    let updatedOrders;
    if (operation === 'add') {
      if(!orders.find(order => order.id === orderData.id)) {
        updatedOrders = [...orders, orderData];
      } else {
        updatedOrders = orders.map(order => order.id === orderData.id ? orderData : order);
      }
    } else if (operation === 'delete') {
      const orderToUpdate = orders.find(order => order.id === orderData)
      if (!orderToUpdate) {
        throw new Error('Error deleting the order');
      }
      updatedOrders = orders.filter((order) => order.id !== orderData);
    } else {
      throw new Error('Invalid operation');
    }

    const updatedOrdersData = JSON.stringify(updatedOrders, null, 2);
    fs.writeFileSync(dataPath, updatedOrdersData);

    reloadOpenWindows();

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

ipcMain.handle('add-order', (event, newOrder) =>
  handleOrderOperation('add', event, newOrder)
);
ipcMain.handle('delete-order', (event, orderIdToDelete) =>
  handleOrderOperation('delete', event, orderIdToDelete)
);

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
