import { connect } from 'react-redux';
import { IStore } from '../../store/store.interface';
import { getYearFromDate, stringToString } from '../../utils/date.util';
import { Account } from './account.component';
import { IAccountStateProps, IAccountOwnProps } from './account.props.interface';

function mapStateToProps(state: IStore, ownProps: IAccountOwnProps): IAccountStateProps {
  const { accountId } = ownProps;
  const records = state.records.records[accountId];
  const years = Array.from(new Set(records?.map(r => getYearFromDate(r.date).toString())));

  const newestTransactionDate = records?.[records.length - 1]?.date;

  return {
    hasRecords: !!(records?.length > 0),
    startingDate: newestTransactionDate ? stringToString(newestTransactionDate) : undefined,
    years,
  };
}

export const AccountContainer = connect(mapStateToProps)(Account);
