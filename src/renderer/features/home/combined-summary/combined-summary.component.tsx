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
import { useWindowWidth } from '../../../hooks/use-window-width.hook';
import { formatDateMonthYear } from '../../../utils/date.utils';
import { isNullOrUndefined } from '../../../utils/object.utils';
import { ICombinedSummaryProps } from './combined-summary.props.interface';

const displayWidth = 300;
const nameWidth = 150;
const defaultNumberOfColumns = 1;
const accountSummaryDisplayOption = 'accountSummaryDisplayOption';

export const CombinedSummary = ({ accounts, endMonthBalances, endYearBalances }: ICombinedSummaryProps) => {
  const [numberOfColumns, setNumberOfColumns] = React.useState(defaultNumberOfColumns);
  const [startingColumnIndex, setStartingColumnIndex] = React.useState(0);
  const [byMonth, setByMonth] = React.useState<string>(localStorage.getItem(accountSummaryDisplayOption) || 'monthly');
  const containerRef = React.useRef<HTMLDivElement>();
  const windowWidth = useWindowWidth();

  const endBalances = byMonth === 'monthly' ? endMonthBalances : endYearBalances;
  const displayableEndBalances = endBalances.slice(
    endBalances.length - numberOfColumns - startingColumnIndex,
    endBalances.length - startingColumnIndex
  );

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
    const noc = Math.min(columns, endBalances.length);
    setNumberOfColumns(noc);

    // Have to adjust the starting column index since the window width sizing could affect
    // the calculation of the displayable balance range.
    setStartingColumnIndex(i => (i >= endBalances.length - noc ? endBalances.length - noc : i));
  }, [windowWidth, byMonth]);

  const fullLeftClick = () => setStartingColumnIndex(endBalances.length - numberOfColumns);
  const onLeftClick = () => {
    if (startingColumnIndex < endBalances.length - numberOfColumns) {
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

  // Don't render anything if there are no end balances.
  if (!endBalances || endBalances.flatMap(e => Object.values(e.accountBalances)).filter(e => e).length === 0) {
    return null;
  }

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
          const { id: accountId, accountName } = ac;
          return (
            <Pane key={accountId} padding={10} borderBottom width='100%' display='flex' justifyContent='flex-start'>
              <Text whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                {accountName}
              </Text>
            </Pane>
          );
        })}
        <Pane display='flex' flexDirection='column' flex={1} justifyContent='flex-end' width='100%'>
          <Pane padding={10} borderBottom borderTop display='flex' justifyContent='flex-start'>
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
        <Pane border borderRadius={0}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'hidden',
              width: displayWidth * numberOfColumns,
              minHeight: 400,
            }}
          >
            {displayableEndBalances.map(eb => {
              return (
                <Pane
                  key={eb.date}
                  minWidth={displayWidth}
                  borderLeft
                  borderRadius={0}
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-between'
                >
                  <Pane>
                    <Pane
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      background='tint1'
                      borderBottom
                      height={31}
                    >
                      <Heading>{byMonth === 'monthly' ? formatDateMonthYear(eb.date) : eb.date}</Heading>
                    </Pane>
                    <Pane>
                      {Object.keys(eb.accountBalances).map(accountId => {
                        const balance = eb.accountBalances[accountId];
                        return (
                          <Pane
                            key={accountId}
                            padding={10}
                            borderBottom
                            width='100%'
                            display='flex'
                            justifyContent='flex-end'
                          >
                            <Text>{isNullOrUndefined(balance) ? '-' : balance?.toFixed(2)}</Text>
                          </Pane>
                        );
                      })}
                    </Pane>
                  </Pane>
                  <Pane borderTop>
                    <Pane padding={10} width='100%' display='flex' justifyContent='flex-end'>
                      <Text>{isNullOrUndefined(eb.total) ? '-' : eb.total?.toFixed(2)}</Text>
                    </Pane>
                  </Pane>
                </Pane>
              );
            })}
          </div>
        </Pane>
      </Pane>
    </div>
  );
};
