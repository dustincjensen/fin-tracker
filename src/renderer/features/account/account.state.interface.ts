export interface IAccountState {
  /**
   * The list of tabs (month names) to display.
   */
  tabs: string[];

  /**
   * The date of the current month to display.
   */
  date: string;

  /**
   * The selected tab index.
   */
  selectedIndex: number;
}
