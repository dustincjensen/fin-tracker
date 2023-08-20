import { connect } from 'react-redux';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import {
    allMonthsBetweenDates,
    getEarliestDate,
    getLatestDate,
    getMonthAndYearFromDate,
    stringToDayMonthYear,
} from '../../../utils/date.utils';
import { Account, AccountProps } from './account.component';

type StateProps = Pick<AccountProps, 'hasRecords' | 'startingDate' | 'monthAndYears' | 'archived'>;
type OwnProps = Pick<AccountProps, 'accountId'>;

const mapStateToProps = (state: IStore, { accountId }: OwnProps): StateProps => {
    const account = AccountSelectors.account(state, accountId);
    const records = RecordSelectors.recordsByAccountId(state, accountId);

    const recordDates = records?.map(r => r.date);
    // TODO this could probably be optimized, it currently has to call back into date utils far more than it should have to.
    const monthAndYears = recordDates
        ? allMonthsBetweenDates(getEarliestDate(recordDates), getLatestDate(recordDates)).map(my =>
              getMonthAndYearFromDate(my)
          )
        : [];

    const newestTransactionDate = records?.[records.length - 1]?.date;

    return {
        hasRecords: !!(records?.length > 0),
        startingDate: newestTransactionDate ? stringToDayMonthYear(newestTransactionDate) : undefined,
        monthAndYears,
        archived: !!account.archived,
    };
};

export const AccountContainer = connect(mapStateToProps)(Account);
