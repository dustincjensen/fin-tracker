import { ipcMain } from 'electron';
import { MainElectron } from './main';

export class Intercommunication {
  public static setupListeners(): void {
    ipcMain.on('IPC_RECEIVE_RENDERER', (_event, type, ...args: unknown[]) => {
      MainElectron.background.webContents.send('IPC_SEND_BACKGROUND', type, args);
    });

    ipcMain.on('IPC_RECEIVE_BACKGROUND', (_event, type, ...args: unknown[]) => {
      MainElectron.renderer.webContents.send('IPC_SEND_RENDERER', type, ...args);
    });
  }
}
