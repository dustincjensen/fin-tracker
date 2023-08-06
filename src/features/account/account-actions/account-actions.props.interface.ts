export interface IAccountActionsProps {
    /**
     * The ID of the account to action against.
     */
    accountId: string;

    /**
     * The filtered description.
     */
    filterDescription: string;

    /**
     * Function to set the filtered description.
     */
    setFilterDescription: React.Dispatch<React.SetStateAction<string>>;

    /**
     * The selected category ID.
     */
    selectedCategoryId: string;

    /**
     * Function to set the selected category ID.
     */
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<string>>;
}
