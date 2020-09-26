import { connect } from 'react-redux';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { getYearFromDate, stringToString } from '../../../utils/date.util';
import { Account } from './account.component';
import { IAccountProps } from './account.props.interface';

type StateProps = Pick<IAccountProps, 'hasRecords' | 'startingDate' | 'years'>;
type OwnProps = Pick<IAccountProps, 'accountId'>;

const mapStateToProps = (state: IStore, { accountId }: OwnProps): StateProps => {
  const records = RecordSelectors.recordsByAccountId(state, accountId);
  const years = Array.from(new Set(records?.map(r => getYearFromDate(r.date).toString())));

  const newestTransactionDate = records?.[records.length - 1]?.date;

  return {
    hasRecords: !!(records?.length > 0),
    startingDate: newestTransactionDate ? stringToString(newestTransactionDate) : undefined,
    years,
  };
};

export const AccountContainer = connect(mapStateToProps)(Account);
