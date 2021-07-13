export type OpenExchangeRatesRates = {
  /**
   * The time the rates are for.
   * This is a unix timestamp.
   */
  timestamp: number;

  /**
   * The base rate (USD for free accounts).
   */
  base: string;

  /**
   * The rates keyed by the 3 letter country code.
   * USD, CAD, EUR, GBP, etc.
   */
  rates: Record<string, number>;
}
