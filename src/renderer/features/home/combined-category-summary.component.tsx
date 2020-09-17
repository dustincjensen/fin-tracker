import useLocalStorage from '@rehooks/local-storage';
import { Button, Checkbox, IconButton, Pane, SelectMenu, SelectMenuItem } from 'evergreen-ui';
import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ICategory } from '../../store/category/category.interface';
import { formatDateMonthYear } from '../../utils/date.util';
import { isNullOrUndefined } from '../../utils/object.utils';
import { ICombinedCategorySummaryProps } from './combined-category-summary.props.interface';

const barChartMargins = { top: 5, right: 0, left: 0, bottom: 5 };
const combinedCategorySummaryDisplayOption = 'combinedCategorySummaryDisplayOption';
const combinedCategorySummaryStackedOption = 'combinedCategorySummaryStackedOption';

const getSelectedName = (ids: string[], categories: ICategory[]): string => {
  let selectedNames = '';
  if (ids.length === 0) {
    selectedNames = '';
  } else if (ids.length === 1) {
    selectedNames = categories.find(c => c.id === ids[0]).name;
  } else if (ids.length > 1) {
    selectedNames = ids.length.toString() + ' categories...';
  }
  return selectedNames;
};

const idsThatExistInCategories = (ids: string, categories: ICategory[]) => {
  const idArray = ids.split(',');
  return idArray.filter(id => categories.some(c => c.id === id));
};

export const CombinedCategorySummary: React.FC<ICombinedCategorySummaryProps> = ({
  categories,
  categoryTotalsByMonth,
}) => {
  const firstCategory = categories?.[0];
  const [selectedCategories, setSelectedCategories] = React.useState(() => {
    const ids = localStorage.getItem(combinedCategorySummaryDisplayOption);
    return !isNullOrUndefined(ids)
      ? idsThatExistInCategories(ids, categories)
      : firstCategory?.id
      ? [firstCategory.id]
      : [];
  });
  const [selectedNames, setSelectedNames] = React.useState(() => {
    const ids = localStorage.getItem(combinedCategorySummaryDisplayOption);
    return getSelectedName(
      !isNullOrUndefined(ids) ? idsThatExistInCategories(ids, categories) : firstCategory?.id ? [firstCategory.id] : [],
      categories
    );
  });
  const [isStacked, setIsStacked] = useLocalStorage<boolean>(combinedCategorySummaryStackedOption);

  // Create the data structure, which flattens the categories
  // into an array of objects that is keyed by the name of the
  // month and each category name.
  const data = categoryTotalsByMonth.map(total => {
    const month = { name: formatDateMonthYear(total.date) };
    for (const category of categories) {
      month[category.name] = parseFloat(total.categoryBalances[category.id]?.toFixed(2)) || 0;
    }
    return month;
  });

  const categoryOptions = categories.map(c => ({ label: c.name, value: c.id }));

  const categoryBarStackId = {};
  if (isStacked) {
    categoryBarStackId['stackId'] = 'groupA';
  }

  const categoryBars = categories
    .filter(c => selectedCategories.some(s => s === c.id))
    .map(c => {
      return <Bar key={c.name} dataKey={c.name} fill={c.color} {...categoryBarStackId} />;
    });

  const setNewState = (selectedItems: string[]) => {
    localStorage.setItem(combinedCategorySummaryDisplayOption, selectedItems.toString());
    setSelectedCategories(selectedItems);
    setSelectedNames(getSelectedName(selectedItems, categories));
  };

  const onSelect = (item: SelectMenuItem) => {
    const selectedItems = [...selectedCategories, item.value.toString()];
    setNewState(selectedItems);
  };

  const onDeselect = (item: SelectMenuItem) => {
    const deselectedItemIndex = selectedCategories.indexOf(item.value.toString());
    const selectedItems = selectedCategories.filter((_item, i) => i !== deselectedItemIndex);
    setNewState(selectedItems);
  };

  const onStackChange = () => setIsStacked(!isStacked);

  const clearSelectedCategories = () => setNewState([]);

  return (
    <Pane>
      <Pane display='flex' alignItems='center' justifyContent='flex-end'>
        <Checkbox label='Stacked?' checked={isStacked} onChange={onStackChange} marginRight={15} />
        <SelectMenu
          isMultiSelect
          title='Select Categories'
          options={categoryOptions}
          selected={selectedCategories}
          onSelect={onSelect}
          onDeselect={onDeselect}
        >
          <Button minWidth={150} marginRight={3}>
            {selectedNames || 'Select Categories...'}
          </Button>
        </SelectMenu>
        <IconButton icon='cross' onClick={clearSelectedCategories} />
      </Pane>

      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data} margin={barChartMargins} barGap={0} stackOffset='sign'>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip isAnimationActive={false} />
          <Legend />
          {categoryBars}
        </BarChart>
      </ResponsiveContainer>
    </Pane>
  );
};
