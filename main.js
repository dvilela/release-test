require('dotenv').config();

const { app, BrowserWindow, utilityProcess } = require('electron');

let mainWindow;
let workerProcess;

function createWorker() {
    workerProcess = utilityProcess.fork('./src/app/worker.js');
}

function createWindow() {
    return;
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load your main window content
    mainWindow.loadFile('src/app/index.html');
}

app.on('ready', () => {
    createWindow();
    createWorker();

    app.setLoginItemSettings({
        openAtLogin: true,
        path: app.getPath("exe")
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('before-quit', () => {
    app.isQuitting = true;
});

// Handle IPC or other events here
