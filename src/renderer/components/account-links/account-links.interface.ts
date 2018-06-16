export interface IAccountProps {
  accounts: { [id: string]: IAccount };
}

export interface IAccount {
  id: string;
  name: string;
}
