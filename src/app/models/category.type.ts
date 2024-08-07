export type Category = {
    /**
     * The ID of the category.
     */
    id: string;

    /**
     * The name of the category.
     */
    name: string;

    /**
     * A hex code for the color of the category.
     */
    color: string;

    /**
     * If present, the account to transfer the amount to.
     */
    accountTransferId?: string;
};
