import { app, BrowserWindow } from 'electron';
import path from 'path';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        show: false,
        width: 850,
        height: 500,
        minWidth: 825,
        minHeight: 475,
        frame: false
    });
    
    // and load the index.html of the app.
    mainWindow.loadURL(path.join('file://', __dirname, '/src/index.html') );
    
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    })
    
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
