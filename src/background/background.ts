import { ipcRenderer } from 'electron';

interface IProcessedEvent {
  type: string;
  args: any[];
}

ipcRenderer.on('IPC_SEND_BACKGROUND', (event, type, args: any[]) => {
  const value = eventLookup[type](...args);
  event.sender.send('IPC_RECEIVE_BACKGROUND', value.type, ...value.args);
});

const eventLookup: { [type: string]: (...args: any[]) => IProcessedEvent } = {
  ['IPC_NEW_FILE_SELECTED']: parseFileToRecords
};

function parseFileToRecords(filePath: string): IProcessedEvent {
  console.log('Parse File into records', filePath);

  const parsedFile = {
    records: [
      { id: 1, date: 'May 2, 2018', description: 'Rent', debit: 1300.00 },
      { id: 2, date: 'May 9, 2018', description: 'Cineplex', debit: 54.87 },
      { id: 3, date: 'May 11, 2018', description: 'A&W', debit: 11.54 },
      { id: 4, date: 'May 17, 2018', description: 'McDonalds', debit: 8.54 },
      { id: 5, date: 'May 17, 2018', description: 'Chopped Leaf', debit: 13.11 },
      { id: 6, date: 'May 22, 2018', description: 'Absorb Payroll', credit: 2482.16 }
    ]
  };

  return {
    type: 'IPC_NEW_FILE_PARSED',
    args: [parsedFile]
  };
}
