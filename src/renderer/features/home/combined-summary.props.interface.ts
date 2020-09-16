export interface ICombinedSummaryProps extends ICombinedSummaryStateProps {}

export interface ICombinedSummaryStateProps {
  /**
   * The accounts to display on the left hand side.
   */
  accounts: Array<{
    /**
     * The ID of the account.
     */
    id: string;

    /**
     * The account name.
     */
    accountName: string;
  }>;

  /**
   * The array of end balances for each month.
   */
  endMonthBalances: Array<{
    /**
     * The date the end balances are for.
     */
    date: string;

    /**
     * The object keyed by Account Id that contains
     * balances for each account for the date.
     */
    accountBalances: Record<string, number>;

    /**
     * The total combined value of the account balances
     * for this date.
     */
    total: number;
  }>;

  /**
   * The array of end balances for each year.
   */
  endYearBalances: Array<{
    /**
     * The date the end balances are for.
     */
    date: string;

    /**
     * The object keyed by Account Id that contains
     * balances for each account for the date.
     */
    accountBalances: Record<string, number>;

    /**
     * The total combined value of the account balances
     * for this date.
     */
    total: number;
  }>;
}
