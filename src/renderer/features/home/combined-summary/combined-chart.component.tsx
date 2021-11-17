import * as React from 'react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatDateMonthYear, getYearFromDate } from '../../../utils/date.utils';
import { TotalContext } from './total.context';

export const CombinedChart = (props: {
  displayableDates: string[];
  start: number;
  end: number;
  setStartDate: (date: string) => void;
  byMonth: boolean;
}) => {
  const { displayableDates, start, end, byMonth } = props;
  const totalContext = React.useContext(TotalContext);
  const dateFormat = byMonth ? formatDateMonthYear : getYearFromDate;

  const range = Array.from({ length: props.displayableDates.length }, (_, i) => 0 + i);
  const totals = range.map(index => {
    const total = totalContext.totals
      .map(t => t[index])
      .reduce((prev: number, curr: number) => prev + (curr || 0.0), 0.0);
    return { date: dateFormat(props.displayableDates[index]), total: parseFloat(total.toFixed(2)) };
  });

  const dipsBelowZero = !!totals?.some(r => r.total < 0);

  return (
    <ResponsiveContainer minHeight={300} minWidth={300}>
      <LineChart
        data={totals}
        margin={{ top: 20, right: 0, bottom: 20, left: 20 }}
        onClick={e => {
          if (e?.activeLabel) {
            const index = displayableDates.map(d => dateFormat(d)).indexOf(e.activeLabel);
            if (index >= 0) {
              props.setStartDate(displayableDates[index]);
            }
          }
        }}
      >
        <Line type='monotone' dataKey='total' stroke='#008800' isAnimationActive={false} />
        <CartesianGrid stroke='#222' strokeDasharray='5 5' />
        <XAxis dataKey='date' minTickGap={20}>
          <Label value='Date' position='insideBottom' offset={-5} />
        </XAxis>
        <YAxis>
          <Label value='Total' position='left' angle={270} />
        </YAxis>
        <Tooltip isAnimationActive={false} />
        {dipsBelowZero && <ReferenceLine y={0} stroke='#ff0000' strokeDasharray='5 5' />}

        {/* TODO handle reference area when it is 1 month/year. */}
        <ReferenceArea x1={dateFormat(displayableDates[start])} x2={dateFormat(displayableDates[end - 1])} />
      </LineChart>
    </ResponsiveContainer>
  );
};
