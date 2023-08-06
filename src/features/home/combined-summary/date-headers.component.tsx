import { Heading, Pane } from 'evergreen-ui';
import React from 'react';
import { formatDateMonthYear } from '../../../utils/date.utils';

const displayWidth = 300;

export const DateHeaders = ({
  dates,
  start,
  end,
  byMonth,
}: {
  dates: string[];
  start: number;
  end: number;
  byMonth: string;
}) => {
  return (
    <Pane display='flex' flexDirection='row'>
      {dates.slice(start, end).map(d => {
        return (
          <Pane
            key={d}
            display='flex'
            alignItems='center'
            justifyContent='center'
            background='tint1'
            borderLeft
            borderBottom
            height={31}
            minWidth={displayWidth}
          >
            <Heading>{byMonth === 'monthly' ? formatDateMonthYear(d) : d}</Heading>
          </Pane>
        );
      })}
    </Pane>
  );
};
