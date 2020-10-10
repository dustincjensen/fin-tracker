import { connect } from 'react-redux';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import {
  allMonthsBetweenDates,
  getEarliestDate,
  getLatestDate,
  getMonthAndYearFromDate,
  stringToString,
} from '../../../utils/date.utils';
import { Account } from './account.component';
import { IAccountProps } from './account.props.interface';

type StateProps = Pick<IAccountProps, 'hasRecords' | 'startingDate' | 'monthAndYears'>;
type OwnProps = Pick<IAccountProps, 'accountId'>;

const mapStateToProps = (state: IStore, { accountId }: OwnProps): StateProps => {
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
    startingDate: newestTransactionDate ? stringToString(newestTransactionDate) : undefined,
    monthAndYears,
  };
};

export const AccountContainer = connect(mapStateToProps)(Account);
