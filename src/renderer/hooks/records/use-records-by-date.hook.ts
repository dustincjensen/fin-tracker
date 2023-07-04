import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { createDate, isInYearMonth } from '../../utils/date.utils';

/**
 * Returns the records for a specific account in the given year and month.
 *
 * @param accountId   The ID of the account.
 * @param date        The year/month to get records for.
 */
export const useRecordsByDate = (accountId: string, date: string) => {
  const records = useSelector((state: IStore) => RecordSelectors.recordsByAccountId(state, accountId));

  return {
    records: useMemo(() => {
      const targetDate = createDate(date);
      return records?.filter(r => isInYearMonth(targetDate, createDate(r.date)));
    }, [date, records]),
  };
};
