const { app, BrowserWindow } = require("electron")
const path = require("path")

function createWindow() {

    const win = new BrowserWindow({

        width: 1000,
        height: 700

    })

    win.loadFile(path.join(__dirname, "./index.html"))

    win.webContents.openDevTools()

}

app.whenReady().then(createWindow)