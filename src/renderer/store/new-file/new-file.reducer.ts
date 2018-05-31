import INewFile from "./new-file.interface";
import { NEW_FILE_PARSED } from "./new-file.actions";

const initialState = {
  records: []
};

export function NewFileReducer(state = initialState, action): INewFile {
  switch (action.type) {
    case NEW_FILE_PARSED:
      return action.payload;
  }
  return state;
}
