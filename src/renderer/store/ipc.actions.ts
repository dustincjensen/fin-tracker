import * as newFileActions from './new-file/new-file.actions';

const lookup: { [type: string]: Function } = {
  ['IPC_NEW_SCOTIABANK_CHEQUING_RECORDS_PARSED']: newFileActions.NewScotiabankChequingFileParsed,
  ['IPC_NEW_SCOTIABANK_SAVINGS_RECORDS_PARSED']: newFileActions.NewScotiabankSavingsFileParsed,
  ['IPC_NEW_SCOTIABANK_VISA_RECORDS_PARSED']: newFileActions.NewScotiabankVisaFileParsed,
};

export default function ipcHandler(event, ipcType, ...args: any[]) {
  return lookup[ipcType](...args);
}
