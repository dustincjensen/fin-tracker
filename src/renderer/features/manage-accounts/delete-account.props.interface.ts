import { IAccount } from "../../store/account/account.interface";

export interface IDeleteAccountProps {
    /**
     * The account to delete.
     */
    account: IAccount;

    /**
     * Action to perform when the modal is closed without confirming.
     */
    onClose: () => void;

    /**
     * Action to perform when the modal is closed after confirming.
     */
    onConfirm: () => void;

    /**
     * Action to delete the account.
     */
    deleteAccount: (accountId: string) => void;
}