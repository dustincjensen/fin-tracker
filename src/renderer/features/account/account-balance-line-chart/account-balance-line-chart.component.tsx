import * as React from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IAccountBalanceLineChartProps } from './account-balance-line-chart.props.interface';

export const AccountBalanceLineChart = ({ records }: IAccountBalanceLineChartProps) => {
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
