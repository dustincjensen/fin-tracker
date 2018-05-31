import { NewFileParsed } from './new-file/new-file.actions';

const lookup: { [type: string]: Function } = {
  ['IPC_NEW_FILE_PARSED']: NewFileParsed
};

export default function ipcHandler(event, ipcType, ...args: any[]) {
  return lookup[ipcType](...args);
}
