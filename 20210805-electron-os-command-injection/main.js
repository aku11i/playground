const { app, BrowserWindow, ipcMain } = require("electron/main");
const { execSync } = require("child_process");
const path = require("path");
const os = require("os");

console.log("main");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  app.quit();
});

ipcMain.handle("CREATE_NEW_DIRECTORY", (_event, name) => {
  const command = `mkdir "${name}"`;

  console.log("execSync:", command);
  execSync(command);
});

// ipcMain.handle("CREATE_NEW_DIRECTORY", (_event, name) => {
//   // Safe way
//   require("child_process").execFileSync("mkdir", [name]);
// });
