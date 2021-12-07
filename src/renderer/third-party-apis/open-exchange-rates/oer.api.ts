import { OpenExchangeRatesCurrencies } from './oer-currencies.type';
import { OpenExchangeRatesRates } from './oer-rates.type';

const baseUrl = 'https://openexchangerates.org/api';
const currenciesUrl = `${baseUrl}/currencies.json`;
const historicalRatesUrl = `${baseUrl}/historical/{yyyymmdddate}.json?app_id=`;
const todaysRatesUrl = `${baseUrl}/latest.json?app_id=`;

export class OpenExchangeRatesApi {
  /**
   * Returns a promise of available currencies.
   */
  public static async getCurrencies(): Promise<OpenExchangeRatesCurrencies> {
    try {
      const response = await fetch(currenciesUrl);
      const data = await response.json();
      return data;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  /**
   * Returns the exchange rate on the specified date.
   *
   * @param apiKey  The API key for the request.
   * @param date    The date to get the exchange rate on.
   */
  public static async getRatesOn(apiKey: string, date: string): Promise<OpenExchangeRatesRates> {
    try {
      const response = await fetch(historicalRatesUrl.replace('{yyyymmdddate}', date) + apiKey);
      const data = await response.json();
      return data as OpenExchangeRatesRates;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  /**
   * Returns the exchange rate for today.
   *
   * @param apiKey  The API key for the request.
   */
  public static async getTodaysRates(apiKey: string): Promise<OpenExchangeRatesRates> {
    try {
      const response = await fetch(todaysRatesUrl + apiKey);
      const data = await response.json();
      return data as OpenExchangeRatesRates;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
}
