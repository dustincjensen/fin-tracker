import INewFile from "./new-file.interface";
import { NEW_FILES_SELECTED } from "./new-file.actions";

const initialState = {
  records: []
};

export function NewFileReducer(state = initialState, action): INewFile {
  switch (action.type) {
    case NEW_FILES_SELECTED:
      return {
        records: [
          { id: 1, date: 'May 2, 2018', description: 'Rent', debit: 1300.00 },
          { id: 2, date: 'May 9, 2018', description: 'Cineplex', debit: 54.87 },
          { id: 3, date: 'May 11, 2018', description: 'A&W', debit: 11.54 },
          { id: 4, date: 'May 17, 2018', description: 'McDonalds', debit: 8.54 },
          { id: 5, date: 'May 17, 2018', description: 'Chopped Leaf', debit: 13.11 },
          { id: 6, date: 'May 22, 2018', description: 'Absorb Payroll', credit: 2482.16 }
        ]
      };
  }
  return state;
}
