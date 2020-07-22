const { app, BrowserWindow } = require("electron");

app.setAppUserModelId("com.schoolofnet.son-electron-anotacoes");

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile("./src/index.html");
  mainWindow.on("closed", function () {
   mainWindow = null;
  });
}

// mainWindow.setMenu(null);

app.on("ready", createWindow);
