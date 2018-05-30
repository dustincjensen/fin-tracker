import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FilePicker } from './components/file-picker/file-picker.component';
import { RecordTable } from './components/record-table/record-table.component';

const App = () => {
  const tmp = [
    { id: 1, date: 'May 2, 2018', description: 'Rent', debit: 1300.00 },
    { id: 2, date: 'May 9, 2018', description: 'Cineplex', debit: 54.87 },
    { id: 3, date: 'May 11, 2018', description: 'A&W', debit: 11.54 },
    { id: 4, date: 'May 17, 2018', description: 'McDonalds', debit: 8.54 },
    { id: 5, date: 'May 17, 2018', description: 'Chopped Leaf', debit: 13.11 },
    { id: 6, date: 'May 22, 2018', description: 'Absorb Payroll', credit: 2482.16 }
  ];
  //const tmp = null;

  return (
    <div>
      <FilePicker />
      <RecordTable records={tmp} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
