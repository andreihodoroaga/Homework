const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const fs = require("fs");
const path = require("path");
const url = require("url");

const isDev = process.env["NODE_ENV"] !== "production";
const isMac = process.platform === "darwin";

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
    mainWindow.loadURL("http://localhost:4200");
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/order-sculptures/index.html`),
        protocol: "file:",
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

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const menuTemplate = [
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [
      {
        label: "New Window",
        accelerator: "CmdOrCtrl+N",
        click: createWindow,
      },
      { role: "quit" },
    ],
  },
];

function setCustomMenu() {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

const getDataFromFile = (fileName) => {
  const dataPath = path.join(__dirname, "data", fileName);
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

ipcMain.handle("get-sculptures", (event, args) => {
  return getDataFromFile("sculptures.json");
});

ipcMain.handle("get-orders", (event, args) => {
  return getDataFromFile("orders.json");
});

const handleOperation = async (operation, event, objectData, objectType) => {
  const objects = getDataFromFile(`${objectType}s.json`);

  let updatedObjects;
  if (operation === "add") {
    if (!objects.find((object) => object.id === objectData.id)) {
      updatedObjects = [...objects, objectData];
    } else {
      updatedObjects = objects.map((object) =>
        object.id === objectData.id ? objectData : object
      );
    }
  } else if (operation === "delete") {
    const objectToUpdate = objects.find((object) => object.id === objectData);
    if (!objectToUpdate) {
      throw new Error(`Error deleting the ${objectType}`);
    }
    updatedObjects = objects.filter((object) => object.id !== objectData);
  } else {
    throw new Error("Invalid operation");
  }

  const dataPath = path.join(__dirname, "data", `${objectType}s.json`);
  const updatedObjectsData = JSON.stringify(updatedObjects, null, 2);
  fs.writeFileSync(dataPath, updatedObjectsData);

  reloadOpenWindows();

  return { success: true };
};

ipcMain.handle("add-order", (event, newOrder) =>
  handleOperation("add", event, newOrder, "order")
);

ipcMain.handle("delete-order", (event, orderIdToDelete) =>
  handleOperation("delete", event, orderIdToDelete, "order")
);

ipcMain.handle("add-sculpture", (event, newSculpture) =>
  handleOperation("add", event, newSculpture, "sculpture")
);

function reloadOpenWindows() {
  for (let window of BrowserWindow.getAllWindows()) {
    window.webContents.send("reload-content");
  }
}

// On macOS, the app should close only on Cmd+Q.
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
