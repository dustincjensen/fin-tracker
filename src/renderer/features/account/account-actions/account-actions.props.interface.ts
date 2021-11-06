export interface IAccountActionsProps {
  /**
   * The ID of the account to action against.
   */
  accountId: string;

  selectedCategoryId: string;
  
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
}
