export interface IAccountActionsProps {
  /**
   * The ID of the account to action against.
   */
  accountId: string;

  /**
   * The selected category ID.
   */
  selectedCategoryId: string;
  
  /**
   * Function to set the selected category ID.
   */
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
}
