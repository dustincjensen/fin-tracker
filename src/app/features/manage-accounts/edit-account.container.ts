import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';
import { Account } from '../../models/account.type';
import { updateAccount, archiveAccount } from '../../store/account/account-slice';
import { InvestmentRecordSelectors } from '../../store/investment-record/investment-record.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { createDate } from '../../utils/date.utils';
import { EditAccount, EditAccountProps } from './edit-account.component';

type StateProps = Pick<
    EditAccountProps,
    'saveButtonText' | 'canEditComplexFields' | 'currentBalance' | 'lastTransactionDate'
>;
type DispatchProps = Pick<EditAccountProps, 'saveAccount' | 'archiveAccount'>;
type OwnProps = Pick<EditAccountProps, 'account'>;

const mapStateToProps = () => {
    const selectLastTransactionDate = createSelector(
        RecordSelectors.recordsByAccountId,
        (records): [number, number] => {
            const lastRecordDate = records?.[records.length - 1]?.date;
            if (lastRecordDate) {
                const lrd = createDate(lastRecordDate);
                return [lrd.year(), lrd.month()];
            }
            return undefined;
        }
    );

    const selectLastInvestmentTransactionDate = createSelector(
        InvestmentRecordSelectors.recordsByAccountId,
        (records): [number, number] => {
            const investRecords = records ? [...records] : [];
            investRecords.sort((a, b) => (createDate(a.date) > createDate(b.date) ? 1 : -1));
            const lastRecordDate = investRecords?.[investRecords.length - 1]?.date;
            if (lastRecordDate) {
                const lrd = createDate(lastRecordDate);
                return [lrd.year(), lrd.month()];
            }
            return undefined;
        }
    );

    return (state: IStore, ownProps: OwnProps): StateProps => {
        const records = RecordSelectors.recordsByAccountId(state, ownProps.account.id);
        const currentBalance = RecordSelectors.currentBalance(state, ownProps.account.id);
        const investmentBalance = InvestmentRecordSelectors.balance(state, ownProps.account.id);
        const lastTransactionDate = selectLastTransactionDate(state, ownProps.account.id);
        const lastInvestmentTransactionDate = selectLastInvestmentTransactionDate(state, ownProps.account.id);
        return {
            saveButtonText: 'Update Account',
            canEditComplexFields: (!records || records.length === 0) && !ownProps.account.archived,
            currentBalance: currentBalance ?? investmentBalance,
            lastTransactionDate: lastTransactionDate || lastInvestmentTransactionDate,
        };
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    saveAccount: (account: Account) => dispatch(updateAccount(account)),
    archiveAccount: (id: string, archived: boolean, endYear: number, endMonth: number) =>
        dispatch(archiveAccount({ id, archived, endYear, endMonth })),
});

export const EditAccountContainer = connect(mapStateToProps, mapDispatchToProps)(EditAccount);
