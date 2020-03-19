import * as React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { IAccountBalanceLineChartProps } from './account-balance-line-chart.props.interface';

// TODO clean up the graph a bit more.
export class AccountBalanceLineChart extends React.Component<IAccountBalanceLineChartProps> {
  render() {
    const { records } = this.props;
    const dipsBelowZero = records.some(r => r.balance < 0);
    return (
      <ResponsiveContainer minHeight={300} minWidth={150}>
        <LineChart data={records} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type='monotone' dataKey='balance' stroke='#008800' dot={false} />
          <CartesianGrid stroke='#222' strokeDasharray='5 5' />
          {/* <XAxis dataKey="date" interval={5} ticks={[records.map(r => '')]} /> */}
          <XAxis dataKey='date' ticks={[records.map(() => '')]} />
          <YAxis />
          <Tooltip />
          {dipsBelowZero && <ReferenceLine y={0} stroke='#ff5500' strokeDasharray='5 5' />}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
