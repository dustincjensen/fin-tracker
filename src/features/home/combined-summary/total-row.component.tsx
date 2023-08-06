import { Pane, Text } from 'evergreen-ui';
import React from 'react';
import { isNullOrUndefined } from '../../../utils/object.utils';
import { TotalContext } from './total.context';

const displayWidth = 300;

export const TotalRow = ({ start, end }: { start: number; end: number }) => {
  const totalContext = React.useContext(TotalContext);

  const range = Array.from({ length: end - start }, (_, i) => start + i);
  const totals = range.map(index => {
    const total = totalContext.totals
      .map(t => t[index])
      .reduce((prev: number, curr: number) => prev + (curr || 0.0), 0.0);
    return total;
  });

  return (
    <Pane display='flex' borderTop='3px solid #474d66'>
      {totals.map((t, index) => {
        return (
          <Pane
            key={index}
            minWidth={displayWidth}
            padding={10}
            height={40}
            borderLeft
            display='flex'
            justifyContent='flex-end'
          >
            <Text>{isNullOrUndefined(t) ? '-' : t?.toFixed(2)}</Text>
          </Pane>
        );
      })}
    </Pane>
  );
};
