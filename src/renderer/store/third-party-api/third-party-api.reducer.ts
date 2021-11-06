import { Draft } from 'immer';
import { createDraftReducer } from '../draft.reducer';
import { ThirdPartyApiActions } from './third-party-api.actions';
import { IThirdPartyApiStore } from './third-party-api.store.interface';

const initialState: IThirdPartyApiStore = { openExchangeRatesApiKey: undefined };

export const ThirdPartyApiReducer = createDraftReducer(
  {
    [ThirdPartyApiActions.UPDATE_OER_API_KEY]: updateOerApiKey,
  },
  initialState
);

function updateOerApiKey(draft: Draft<IThirdPartyApiStore>, apiKey: string) {
  draft.openExchangeRatesApiKey = apiKey;
}