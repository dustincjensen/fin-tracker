import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AccountActions } from '../../../store/account/account.actions';
import { IAccount } from '../../../store/account/account.interface';
import { EditAccount } from '../edit-account/edit-account.component';
import { IEditAccountProps } from '../edit-account/edit-account.props.interface';

const mapStateToProps = (): Pick<IEditAccountProps, 'headerText' | 'saveButtonText' | 'canEditComplexFields'> => ({
  headerText: 'New Account',
  saveButtonText: 'Save Account',
  canEditComplexFields: true,
});

const mapDispatchToProps = (dispatch: Dispatch): Pick<IEditAccountProps, 'saveAccount'> => ({
  saveAccount: (account: IAccount) => dispatch(AccountActions.saveNewAccount(account)),
});

export const NewAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);
