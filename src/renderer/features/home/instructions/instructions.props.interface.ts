export interface IInstructionsProps {
  /**
   * Whether the user has created any accounts.
   */
  hasAccounts: boolean;

  /**
   * Whether the user has imported records into at least one account.
   */
  atLeastOneAccountHasRecords: boolean;

  /**
   * Whether the user has created an categories.
   */
  hasCategories: boolean;

  /**
   * Whether the user has created any auto categories.
   */
  hasAutoCategories?: boolean;

  /**
   * Whether the user has created any split records.
   */
  hasSplitRecords?: boolean;
}
