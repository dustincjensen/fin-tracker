import {
  Pane,
  Heading,
  IconButton,
  Text,
  Select,
  DoubleChevronLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronRightIcon,
} from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useWindowWidth } from '../../../hooks/use-window-width.hook';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { isBankAccount } from '../../../utils/account.utils';
import { useRatesByDates } from '../../investment/_hooks/use-rates-by-dates.hook';
import { displayMonthDates, displayYearDates } from '../combined.utils';
import { BankAccountRowSummary } from './bank-account-row-summary.component';
import { DateHeaders } from './date-headers.component';
import { InvestmentAccountRowSummary } from './investment-account-row-summary.component';
import { TotalRow } from './total-row.component';
import { TotalContext } from './total.context';

const displayWidth = 300;
const nameWidth = 150;
const defaultNumberOfColumns = 1;
const accountSummaryDisplayOption = 'accountSummaryDisplayOption';

export const CombinedSummary = () => {
  const [numberOfColumns, setNumberOfColumns] = React.useState(defaultNumberOfColumns);
  const [startingColumnIndex, setStartingColumnIndex] = React.useState(0);
  const [byMonth, setByMonth] = React.useState<string>(localStorage.getItem(accountSummaryDisplayOption) || 'monthly');
  const containerRef = React.useRef<HTMLDivElement>();
  const windowWidth = useWindowWidth();

  const dateSelector = React.useMemo(() => byMonth === 'monthly' ? displayMonthDates : displayYearDates, [byMonth]);
  const displayableDates = useSelector(dateSelector);

  const accounts = useSelector(AccountSelectors.selectAccounts);

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const containerRefWidth = containerRef.current.getBoundingClientRect().width;
    let columns = 1;
    let calculatedWidth = displayWidth * (columns + 1) + nameWidth;
    while (calculatedWidth < containerRefWidth) {
      columns++;
      calculatedWidth = displayWidth * (columns + 1) + nameWidth;
    }

    // Math.min(columns, 4)
    // If we want to limit the width of the component
    const noc = Math.min(columns, displayableDates.length);
    setNumberOfColumns(noc);

    // Have to adjust the starting column index since the window width sizing could affect
    // the calculation of the displayable balance range.
    setStartingColumnIndex(i => (i >= displayableDates.length - noc ? displayableDates.length - noc : i));
  }, [windowWidth, byMonth]);

  const fullLeftClick = () => setStartingColumnIndex(displayableDates.length - numberOfColumns);
  const onLeftClick = () => {
    if (startingColumnIndex < displayableDates.length - numberOfColumns) {
      setStartingColumnIndex(i => i + 1);
    }
  };
  const fullRightClick = () => setStartingColumnIndex(0);
  const onRightClick = () => {
    if (startingColumnIndex > 0) {
      setStartingColumnIndex(i => i - 1);
    }
  };

  const setDisplayOption = evt => {
    // Set the index back to the start when toggling between month and year since one chart might
    // have significantly more or less columns.
    setStartingColumnIndex(0);
    setByMonth(evt.target.value);
    localStorage.setItem(accountSummaryDisplayOption, evt.target.value);
  };

  // TODO test this again
  // // Don't render anything if there are no end balances.
  // if (!displayableDates || displayableDates.flatMap(e => Object.values(e.accountBalances)).filter(e => e).length === 0) {
  //   return null;
  // }

  const start = displayableDates.length - numberOfColumns - startingColumnIndex;
  const end = displayableDates.length - startingColumnIndex;

  
  // TODO dates are first of month (this leads to weird stuff like calculating May 31st record value if it was there on May 1st.)
  const { rates } = useRatesByDates(displayableDates, 'USD');
  // console.log(rates);


  return (
    <div ref={containerRef} style={{ display: 'flex' }}>
      <Pane
        display='flex'
        flexDirection='column'
        alignItems='flex-end'
        height='auto'
        minWidth={nameWidth}
        maxWidth={nameWidth}
      >
        <Pane marginBottom={35} width='100%'>
          <Select defaultValue={byMonth} width='100%' paddingRight={5} onChange={setDisplayOption}>
            <option value='monthly'>Monthly</option>
            <option value='yearly'>Yearly</option>
          </Select>
        </Pane>
        {accounts.map(ac => {
          const { id: accountId, name: accountName } = ac;
          return (
            <Pane key={accountId} padding={10} borderBottom width='100%' display='flex' justifyContent='flex-start' height={40}>
              <Text whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                {accountName}
              </Text>
            </Pane>
          );
        })}
        <Pane display='flex' flexDirection='column' flex={1} justifyContent='flex-end' width='100%'>
          <Pane padding={10} borderBottom borderTop='3px solid #474d66' display='flex' justifyContent='flex-start'>
            <Text>Total</Text>
          </Pane>
        </Pane>
      </Pane>

      <Pane>
        <Pane display='flex' justifyContent='space-between' alignItems='center' marginBottom={3}>
          <Pane display='flex'>
            <IconButton icon={DoubleChevronLeftIcon} onClick={fullLeftClick} marginRight={3} />
            <IconButton icon={ChevronLeftIcon} onClick={onLeftClick} />
          </Pane>
          <Heading>Accounts Summary</Heading>
          <Pane display='flex'>
            <IconButton icon={ChevronRightIcon} onClick={onRightClick} marginRight={3} />
            <IconButton icon={DoubleChevronRightIcon} onClick={fullRightClick} />
          </Pane>
        </Pane>
        <Pane borderTop borderRight borderBottom borderRadius={0}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflowX: 'hidden',
              width: displayWidth * numberOfColumns,
              justifyContent: 'space-between'
            }}
          >
            <TotalContext.Provider value={{ totals: [] }}>
              <Pane>
                <DateHeaders 
                  byMonth={byMonth} 
                  start={start} 
                  end={end}
                  dates={displayableDates} />
                {accounts.map(a => {
                  return isBankAccount(a.accountType) 
                    ? <BankAccountRowSummary key={a.id} accountId={a.id} byMonth={byMonth === 'monthly'} start={start} end={end} dates={displayableDates} />
                    : <InvestmentAccountRowSummary key={a.id} accountId={a.id} byMonth={byMonth === 'monthly'} start={start} end={end} dates={displayableDates} rates={rates} />;
                })}
              </Pane>
              <TotalRow start={start} end={end} />
            </TotalContext.Provider>
          </div>
        </Pane>
      </Pane>
    </div>
  );
};
