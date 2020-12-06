import { createSelector } from "reselect";
import { AccountSelectors } from "../../store/account/account.selectors";
import { RecordSelectors } from "../../store/record/record.selectors";
import { allMonthsBetweenDates, allYearsBetweenDates, getEarliestDate, getLatestDate } from "../../utils/date.utils";

// MONTHS
export const displayMonthDates = createSelector(AccountSelectors.accounts, RecordSelectors.records, (accounts, records) => {
  const startingDates = Object.keys(accounts).map(id => {
    const { startYear, startMonth } = accounts[id];
    // TODO fix typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return `${startYear}-${parseInt(startMonth as any) + 1}`;
  });

  const endDates = Object.keys(accounts).map(id => {
    const accountRecords = records[id];
    return accountRecords?.[accountRecords.length - 1].date;
  });

  return allMonthsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
});

// YEARS
export const displayYearDates = createSelector(AccountSelectors.accounts, RecordSelectors.records, (accounts, records) => {
  const startingDates = Object.keys(accounts).map(id => {
    const { startYear } = accounts[id];
    return `${startYear}-12-01`;
  });

  const endDates = Object.keys(accounts).map(id => {
    const accountRecords = records[id];
    return accountRecords?.[accountRecords.length - 1].date;
  });

  return allYearsBetweenDates(getEarliestDate(startingDates), getLatestDate(endDates));
});