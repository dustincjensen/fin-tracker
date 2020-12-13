import { Button, IconButton, Pane, Popover, Position, Text } from 'evergreen-ui';
import moment from 'moment';
import * as React from 'react';
import { formatDateFull } from '../../utils/date.utils';
import { CalendarDate } from './calendar-date.component';
import { buildMonth } from './date-picker.utils';

const dayNames = moment.weekdaysMin();
const outsideMonthStyle = { color: 'rgba(67, 90, 111, 0.3)' };
const todayStyle = { background: '#DDEBF7' };

interface IDatePickerProps {
  /**
   * The value to use for the date picker.
   */
  value: string;

  /**
   * A useState set method.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
}

// TODO remove moment references for IDate and date.utils methods.
export const DatePicker = ({ value: date, onChange }: IDatePickerProps) => {
  const [today] = React.useState(() =>
    moment()
      .startOf('day')
      .toISOString()
  );
  const [monthInfo, setMonthInfo] = React.useState(() => buildMonth(moment(date || today)));

  const previousMonth = () => setMonthInfo(monthInfo => buildMonth(moment(monthInfo.monthYear).subtract(1, 'month')));
  const nextMonth = () => setMonthInfo(monthInfo => buildMonth(moment(monthInfo.monthYear).add(1, 'month')));

  const changeMonthOnOpen = () => {
    // Selected date is in the month we have displayed.
    if (monthInfo.dates.find(d => d.iso === date)) {
      return;
    }

    // Selected date is in the previous month dates. Render the previous month.
    if (monthInfo.previousDates.find(d => d.iso === date)) {
      previousMonth();
      return;
    }

    // Selected date is in the next month dates. Render the next month.
    if (monthInfo.nextDates.find(d => d.iso === date)) {
      nextMonth();
      return;
    }
  };

  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      onOpen={changeMonthOnOpen}
      content={({ close }) => (
        <Pane width={240}>
          <Pane
            display='grid'
            gridGap='2px'
            gridTemplateRows='auto'
            gridTemplateColumns='repeat(7, 1fr)'
            alignItems='center'
            width={230}
            marginTop={5}
            marginLeft={5}
            marginRight={5}
          >
            {/* Row 1 - Month/Year and month select buttons */}
            <Text gridColumn='1 / 6' fontWeight={700} marginLeft={6}>
              {monthInfo.monthYear}
            </Text>
            <IconButton appearance='minimal' icon='chevron-left' iconSize={20} onClick={previousMonth} />
            <IconButton appearance='minimal' icon='chevron-right' iconSize={20} onClick={nextMonth} />

            {/* Row 2 - Weekday names */}
            {dayNames.map(dn => (
              <Pane key={dn} display='flex' alignItems='center' justifyContent='center'>
                <Text>{dn}</Text>
              </Pane>
            ))}
          </Pane>

          {/* Date Grid */}
          <Pane
            display='grid'
            gridGap='2px'
            gridTemplateRows='repeat(6, 1fr)'
            gridTemplateColumns='repeat(7, 1fr)'
            width={230}
            height={200}
            margin={5}
          >
            {monthInfo.previousDates.map(d => (
              <CalendarDate
                key={d.iso}
                dateToRender={d}
                isSelected={date === d.iso}
                setIsSelected={onChange}
                close={close}
                style={date !== d.iso ? outsideMonthStyle : undefined}
              />
            ))}

            {monthInfo.dates.map(d => (
              <CalendarDate
                key={d.iso}
                dateToRender={d}
                isSelected={date === d.iso}
                setIsSelected={onChange}
                close={close}
                style={d.iso === today && date !== d.iso ? todayStyle : undefined}
              />
            ))}

            {monthInfo.nextDates.map(d => (
              <CalendarDate
                key={d.iso}
                dateToRender={d}
                isSelected={date === d.iso}
                setIsSelected={onChange}
                close={close}
                style={date !== d.iso ? outsideMonthStyle : undefined}
              />
            ))}
          </Pane>
        </Pane>
      )}
    >
      <Button type='button'>{date ? formatDateFull(date) : 'Select a date...'}</Button>
    </Popover>
  );
};
