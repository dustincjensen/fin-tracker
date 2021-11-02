import * as React from 'react';
import { CartesianGrid, Label, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDateMonthYear } from '../../../utils/date.utils';
import { TotalContext } from './total.context';

export const CombinedChart = (props: {
  displayableDates: string[],
  start: number,
  end: number,
  setStartDate: (date: string) => void
}) => {
  const { displayableDates, start, end } = props;
  const totalContext = React.useContext(TotalContext);
  
  const range = Array.from({ length: props.displayableDates.length }, (_, i) => 0 + i);
  const totals = range.map(index => {
    const total = totalContext
      .totals
      .map(t => t[index])
      .reduce((prev: number, curr: number) => prev + (curr || 0.0), 0.0);
    return { date: formatDateMonthYear(props.displayableDates[index]), total: parseFloat(total.toFixed(2)) };
  });

  const dipsBelowZero = !!totals?.some(r => r.total < 0);

  return (
    <ResponsiveContainer minHeight={300} minWidth={300}>
      <LineChart data={totals} margin={{ top: 20, right: 0, bottom: 20, left: 20 }} onClick={e => 
        {
          if (e?.activeLabel) {
            const index = displayableDates.map(d => formatDateMonthYear(d)).indexOf(e.activeLabel);
            if (index >= 0) {
              props.setStartDate(displayableDates[index]);
            }
          }
        }}>
        <Line type='monotone' dataKey='total' stroke='#008800' dot={false} />
        <CartesianGrid stroke='#222' strokeDasharray='5 5' />
        <XAxis dataKey='date' minTickGap={20} >
          <Label value='Date' position="insideBottom" offset={-5} />
        </XAxis>
        <YAxis >
          <Label value='Total' position='left' angle={270} />
        </YAxis>
        <Tooltip isAnimationActive={false} />
        {dipsBelowZero && <ReferenceLine y={0} stroke='#ff0000' strokeDasharray='5 5' />}
        <ReferenceArea x1={formatDateMonthYear(displayableDates[start])} x2={formatDateMonthYear(displayableDates[end - 1])} />
      </LineChart>
    </ResponsiveContainer>
  );
};