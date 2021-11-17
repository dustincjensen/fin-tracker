import { Alert, FormField, majorScale, Pane, Text } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { accountTypeLabels, getAccountStartDate } from '../../../utils/account.utils';
import { stringToMonthYear, today } from '../../../utils/date.utils';
import { sortByDateDescending } from '../../../utils/record.utils';
import { useBalanceByRate } from '../_hooks/use-balance-by-rate.hook';
import { IInvestmentDetailSummaryProps } from './investment-detail-summary.props.interface';

// TODO tidy up component
const Field = ({ label, text }) => (
  <FormField label={label}>
    <Text>{text}</Text>
  </FormField>
);

// TODO Move to common location
const latestBalanceSelector = createSelector(
  (state: IStore) => state.investmentRecords.records,
  (state: IStore, accountId: string) => accountId,
  (State: IStore, accountId: string, currency: string) => currency,
  (records, accountId, currency) =>
    records[accountId]?.filter(r => r.investmentCurrency === currency).sort(sortByDateDescending)[0] || undefined
);

const selectTransferCost = createSelector(
  RecordSelectors.selectAllRecordsWithCategory,
  (state: IStore, accountId: string) => accountId,
  (records, accountId) =>
    records
      ?.map(r => {
        if (r?.credit) {
          return r.accountId === accountId ? r.credit : -r.credit;
        }
        return r.accountId === accountId ? -r.debit : r.debit;
      })
      .reduce((prev, curr) => curr + prev, 0.0)
);

export const InvestmentDetailSummary = ({ accountId }: IInvestmentDetailSummaryProps) => {
  const { archived, name, accountType, startYear, startMonth } = useSelector((state: IStore) =>
    AccountSelectors.account(state, accountId)
  );
  const transferCategory = useSelector((state: IStore) =>
    CategorySelectors.selectCategories(state).find(c => c.accountTransferId === accountId)
  );
  const transferCost = useSelector((state: IStore) => selectTransferCost(state, accountId, transferCategory.id));

  const startDate = stringToMonthYear(getAccountStartDate(startYear, startMonth));

  const cadLatest = useSelector((state: IStore) => latestBalanceSelector(state, accountId, 'CAD'));
  const usdLatest = useSelector((state: IStore) => latestBalanceSelector(state, accountId, 'USD'));
  const { convertedBalance: latestUsdConverted } = useBalanceByRate(
    usdLatest?.balance,
    usdLatest?.date,
    usdLatest?.investmentCurrency
  );
  const { convertedBalance: todaysUsdConverted } = useBalanceByRate(
    usdLatest?.balance,
    today(),
    usdLatest?.investmentCurrency
  );
  const latestBalance = (cadLatest?.balance || 0.0) + (latestUsdConverted || 0.0);
  const todaysBalance = (cadLatest?.balance || 0.0) + (todaysUsdConverted || 0.0);

  return (
    <>
      {archived && <Alert title='This account is archived. No changes can be made.' marginBottom={majorScale(3)} />}
      <Pane
        border
        paddingLeft={40}
        paddingRight={40}
        paddingTop={20}
        paddingBottom={20}
        background='tint1'
        borderRadius={5}
        marginBottom={majorScale(3)}
      >
        <Pane display='grid' gridTemplateColumns='auto auto auto auto auto auto 1fr' columnGap='50px'>
          <Field label='Account Name' text={name} />
          <Field label='Account Type' text={accountTypeLabels[accountType]} />
          <Field label='Start Date' text={startDate} />
          <Field label='Transfer Category' text={transferCategory?.name} />
          <Field label='Transfer Cost' text={transferCost.toFixed(2)} />
          <Field label='Latest Balance' text={latestBalance.toFixed(2)} />
          <Field label="Today's Balance" text={todaysBalance.toFixed(2)} />
        </Pane>
      </Pane>
    </>
  );
};
