import { Account } from '../../models/account.type';

export interface IAccountStore {
    /**
     * The accounts belonging to a user.
     */
    accounts: { [id: string]: Account };
}
