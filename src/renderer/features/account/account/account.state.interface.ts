export interface IAccountState {
  /**
   * The list of month tabs (month names) to display.
   */
  months: string[];

  /**
   * The list of year tabs (year numbers) to display.
   */
  years: string[];

  /**
   * The date of the current month to display.
   */
  date: string;

  /**
   * The selected month tab index.
   */
  selectedMonthIndex: number;

  /**
   * The selected year tab index.
   */
  selectedYearIndex: number;
}
