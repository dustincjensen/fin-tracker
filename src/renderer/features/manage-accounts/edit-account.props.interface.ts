import { IAccount } from '../../store/account/account.interface';

export interface IEditAccountProps extends IEditAccountStateProps, IEditAccountDispatchProps, IEditAccountOwnProps {}

export interface IEditAccountStateProps {
  /**
   * The optional text for the header.
   */
  headerText?: string;

  /**
   * The text for the save button.
   */
  saveButtonText: string;

  /**
   * Whether or not the complex fields can be edited.
   * Complex fields are ones that would affect all records
   * in the account.
   * - Starting Year
   * - Starting Month
   * - Starting Balance
   * - Account Type
   * These will only be editable on a new account until advanced
   * editing is available.
   */
  canEditComplexFields: boolean;
}

export interface IEditAccountDispatchProps {
  /**
   * Action to save an account.
   */
  saveAccount: (account: IAccount) => void;
}

export interface IEditAccountOwnProps {
  /**
   * The existing account if available.
   */
  account?: IAccount;

  /**
   * A function when invoked will close the account section.
   */
  close?: () => void;
}