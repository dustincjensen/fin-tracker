import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Account } from '../../../models/account.type';
import { saveNewAccount } from '../../../store/account/account-slice';
import { EditAccount } from '../edit-account/edit-account.component';
import { IEditAccountProps } from '../edit-account/edit-account.props.interface';

type StateProps = Pick<IEditAccountProps, 'headerText' | 'saveButtonText' | 'canEditComplexFields' | 'isNew'>;
type DispatchProps = Pick<IEditAccountProps, 'saveAccount'>;

const mapStateToProps = (): StateProps => ({
    headerText: 'New Account',
    saveButtonText: 'Save Account',
    canEditComplexFields: true,
    isNew: true,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    saveAccount: (account: Account) => dispatch(saveNewAccount(account)),
});

export const NewAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);
