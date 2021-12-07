import { IStore } from '../store.interface';

export class ThirdPartyApiSelectors {
  /**
   * Returns the open exchange rates api key.
   *
   * @param state   The current application state.
   */
  public static openExchangeRatesApiKey(state: IStore) {
    return state.thirdPartyApi.openExchangeRatesApiKey;
  }
}
