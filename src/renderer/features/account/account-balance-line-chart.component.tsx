import React, { useMemo } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useRecordsByDate } from '../../hooks/records/use-records-by-date.hook';
import { formatDate } from '../../utils/date.utils';

export type AccountBalanceLineChartProps = {
  /**
   * The ID of the account to display.
   */
  accountId: string;

  /**
   * The first date of the month to get the data for.
   */
  date: string;
};

const useAccountBalanceLineChart = (accountId: string, date: string) => {
  const { records } = useRecordsByDate(accountId, date);
  return {
    records: useMemo(() => records?.map(r => ({ ...r, date: formatDate(r.date) })), [records]),
  };
};

export const AccountBalanceLineChart = ({ accountId, date }: AccountBalanceLineChartProps) => {
  const { records } = useAccountBalanceLineChart(accountId, date);

  const dipsBelowZero = !!records?.some(r => r.balance < 0);
  return (
    <ResponsiveContainer minHeight={300} minWidth={300}>
      <LineChart data={records} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type='monotone' dataKey='balance' stroke='#008800' dot={false} />
        <CartesianGrid stroke='#222' strokeDasharray='5 5' />
        <XAxis dataKey='date' ticks={[records?.map(() => '')]} />
        <YAxis />
        <Tooltip />
        {dipsBelowZero && <ReferenceLine y={0} stroke='#ff0000' strokeDasharray='5 5' />}
      </LineChart>
    </ResponsiveContainer>
  );
};
