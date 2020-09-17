import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { Pane, Heading, IconButton, Tooltip } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { AccountSummariesContainer } from './account-summaries.container';
import { CombinedCategorySummaryContainer } from './combined-category-summary.container';
import { CombinedSummaryContainer } from './combined-summary.container';
import { InstructionsContainer } from './instructions.container';
import { OptionalDisplay } from './optional-display.component';
import { IOptionalDisplayProps } from './optional-display.props.interface';

const homePageOrderLocalStorage = 'homePageOrder';
const accountsSummaryTilesDisplayed = 'accountsSummaryTilesDisplayed';
const accountsSummaryMonthlyYearlyDisplayed = 'accountsSummaryMonthlyYearlyDisplayed';
const categoriesSummaryMonthlyYearlyDisplayed = 'categoriesSummaryMonthlyYearlyDisplayed';

const defaultOrder = [
  accountsSummaryTilesDisplayed,
  accountsSummaryMonthlyYearlyDisplayed,
  categoriesSummaryMonthlyYearlyDisplayed,
];

const renderAccountsSummaryTitle = (locked: boolean, updateOrder: IOptionalDisplayProps['updateOrder']) => (
  <OptionalDisplay
    locked={locked}
    title='Accounts Summary (Tiles)'
    displayKey={accountsSummaryTilesDisplayed}
    updateOrder={updateOrder}
    component={AccountSummariesContainer}
  />
);

const renderAccountsSummaryMonthlyYearly = (locked: boolean, updateOrder: IOptionalDisplayProps['updateOrder']) => (
  <OptionalDisplay
    locked={locked}
    title='Accounts Summary (Monthly/Yearly)'
    displayKey={accountsSummaryMonthlyYearlyDisplayed}
    updateOrder={updateOrder}
    component={CombinedSummaryContainer}
  />
);

const renderCategoriesSummaryMonthlyYearly = (locked: boolean, updateOrder: IOptionalDisplayProps['updateOrder']) => (
  <OptionalDisplay
    locked={locked}
    title='Category Totals Chart (Monthly/Yearly)'
    displayKey={categoriesSummaryMonthlyYearlyDisplayed}
    updateOrder={updateOrder}
    component={CombinedCategorySummaryContainer}
  />
);

const keyToRenderMap = {
  [accountsSummaryTilesDisplayed]: renderAccountsSummaryTitle,
  [accountsSummaryMonthlyYearlyDisplayed]: renderAccountsSummaryMonthlyYearly,
  [categoriesSummaryMonthlyYearlyDisplayed]: renderCategoriesSummaryMonthlyYearly,
};

export const HomeLayout: React.FC = () => {
  const [locked, setLocked] = React.useState<boolean>(true);
  const updateLocked = () => setLocked(v => !v);
  const [homePageOrder] = useLocalStorage<string[]>(homePageOrderLocalStorage, defaultOrder);
  const [fullHomePageOrder, setFullHomePageOrder] = React.useState<string[]>([
    ...homePageOrder.filter(k => defaultOrder.indexOf(k) >= 0),
    ...defaultOrder.filter(k => homePageOrder.indexOf(k) < 0),
  ]);

  const updateHomePageOrder = React.useCallback(
    (key: string, direction: 'up' | 'down') => {
      const indexOfKey = fullHomePageOrder.indexOf(key);
      if (indexOfKey < 0) return;
      if (indexOfKey === 0 && direction === 'up') return;
      if (indexOfKey === fullHomePageOrder.length - 1 && direction === 'down') return;

      const firstHalf = fullHomePageOrder.slice(0, indexOfKey);
      const secondHalf = fullHomePageOrder.slice(indexOfKey + 1);

      if (direction === 'up') {
        const newOrder = [
          ...firstHalf.slice(0, firstHalf.length - 1),
          fullHomePageOrder[indexOfKey],
          ...firstHalf.slice(firstHalf.length - 1),
          ...secondHalf,
        ];
        writeStorage(homePageOrderLocalStorage, newOrder);
        setFullHomePageOrder(newOrder);
      } else {
        const newOrder = [
          ...firstHalf,
          ...secondHalf.slice(0, 1),
          fullHomePageOrder[indexOfKey],
          ...secondHalf.slice(1),
        ];
        writeStorage(homePageOrderLocalStorage, newOrder);
        setFullHomePageOrder(newOrder);
      }
    },
    [fullHomePageOrder]
  );

  return (
    <ErrorBoundary>
      <Pane>
        <Pane display='flex' justifyContent='space-between' marginBottom={10}>
          <Heading size={700}>{locked ? 'Home' : 'Edit Home'}</Heading>
          <Tooltip position='left' content={locked ? 'Edit Home page' : 'Finish Edit Home page'}>
            <IconButton icon={locked ? 'lock' : 'unlock'} appearance='minimal' onClick={updateLocked} />
          </Tooltip>
        </Pane>
        <Pane>
          {/* Don't display instructions when unlocking the home page */}
          {locked && <InstructionsContainer />}

          {/* Render the home page components that the user can turn on/off */}
          {fullHomePageOrder.map(key => {
            return <Pane key={key}>{keyToRenderMap[key](locked, updateHomePageOrder)}</Pane>;
          })}
        </Pane>
      </Pane>
    </ErrorBoundary>
  );
};
