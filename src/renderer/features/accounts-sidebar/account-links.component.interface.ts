import { IAccount } from '../../store/account/account.interface';

// TODO redo filename and how this works

export interface IAccountProps {
  accounts: { [id: string]: IAccount };
}
