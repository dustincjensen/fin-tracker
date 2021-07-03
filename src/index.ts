import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { Intercommunication } from './intercommunication';

const ElectronStore = require('electron-store');

ElectronStore.initRenderer();

export class MainElectron {
  // Keep a reference to the window object, if you don't, the
  // window will be closed automatically when the Javascript
  // object is garbage collected.
  public static renderer: BrowserWindow;
  public static background: BrowserWindow;

  public static start() {
    if (require('electron-squirrel-startup')) {
      app.quit();
    }

    MainElectron._initializeElectron();
    Intercommunication.setupListeners();
  }

  private static isDev(): boolean {
    return process.argv[2] === '--dev';
  }

  private static _initializeElectron(): void {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.allowRendererProcessReuse = true;

    app.on('ready', MainElectron._createWindow);

    // This handles window activation, like in macOS.
    app.on('activate', MainElectron._windowActivate);

    // Quit when all windows are closed
    app.on('window-all-closed', MainElectron._allWindowsClosed);
  }

  private static _windowActivate(): void {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (MainElectron.renderer === null) {
      MainElectron._createWindow();
    }
  }

  private static _allWindowsClosed(): void {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private static _createWindow(): void {
    const windowOptions: BrowserWindowConstructorOptions = {
      title: 'fin-tracker',
      width: 1600,
      minWidth: 300,
      height: 900,
      minHeight: 300,
      backgroundColor: '#fff',
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
      autoHideMenuBar: !MainElectron.isDev(),
    };

    // if (MainElectron.__DARWIN__) {
    //     windowOptions.titleBarStyle = 'hidden';
    // } else if (MainElectron.__WIN32__) {
    //     windowOptions.frame = false;
    // }
    // Create the browser window
    MainElectron.renderer = new BrowserWindow(windowOptions);

    // and load the index.html of the app.
    MainElectron.renderer.loadURL(
      url.format({
        pathname: path.join(__dirname, './renderer.html'),
        protocol: 'file:',
        slashes: true,
      })
    );

    // Open the DevTools.
    if (MainElectron.isDev()) {
      MainElectron.renderer.webContents.openDevTools();
    }

    // Stop the window from changing it's title
    MainElectron.renderer.on('page-title-updated', event => {
      event.preventDefault();
    });

    // Emitted when the window is closed.
    MainElectron.renderer.on('closed', () => {
      // Dereference the window object.
      MainElectron.renderer = null;

      // Dereference the background window too.
      MainElectron.background = null;

      // If you don't do this fin-tracker keeps running forever.
      app.quit();
    });

    // Create the background window to handle work for us.
    MainElectron.background = new BrowserWindow({
      show: MainElectron.isDev(),
      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
      },
    });

    MainElectron.background.loadURL(
      url.format({
        pathname: path.join(__dirname, './background.html'),
        protocol: 'file:',
        slashes: true,
      })
    );

    if (MainElectron.isDev()) {
      MainElectron.background.webContents.openDevTools();
    }
  }
}

MainElectron.start();
