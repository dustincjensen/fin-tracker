import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { AppActions } from './app.actions';
import { IAppStore } from './app.store.interface';

const initialState: IAppStore = { initializing: false };

export const AppReducer = createDraftReducer(
  {
    [AppActions.INITIALIZE]: initialize,
    [AppActions.INITIALIZED]: initialized,
  },
  initialState
);

function initialize(draft: Draft<IAppStore>) {
  draft.initializing = true;
}

function initialized(draft: Draft<IAppStore>) {
  draft.initializing = false;
}
