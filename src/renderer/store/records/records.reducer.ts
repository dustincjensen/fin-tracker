import IRecord from './record.interface';
import * as recordsActions from './records.actions';

const initialState: IRecord[] = [];

export function RecordsReducer(state = initialState, action): IRecord[] {
  switch (action.type) {
    case recordsActions.SAVE_NEW_RECORDS:
      return [
        ...state,
        ...action.payload
      ];
  }
  return state;
}
