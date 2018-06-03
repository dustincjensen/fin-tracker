import INewFile from "./new-file.interface";
import * as newFileActions from "./new-file.actions";

const initialState = {
  chequingRecords: [],
  savingsRecords: [],
  visaRecords: [],
};

export function NewFileReducer(state = initialState, action): INewFile {
  switch (action.type) {
    case newFileActions.NEW_SCOTIABANK_CHEQUING_FILE_PARSED:
      return { ...state, chequingRecords: action.payload.records };
    case newFileActions.NEW_SCOTIABANK_SAVINGS_FILE_PARSED:
      return { ...state, savingsRecords: action.payload.records };
    case newFileActions.NEW_SCOTIABANK_VISA_FILE_PARSED:
      return { ...state, visaRecords: action.payload.records };
  }
  return state;
}
