import { Tablist, Pane, Tab } from 'evergreen-ui';
import React from 'react';
import { getMonthAndYearFromDate, monthNamesShort } from '../../../utils/date.utils';

// Example for react spring
// https://codesandbox.io/embed/lp80n9z7v9

type MonthYearListProps = {
    startingDate: string;
    monthAndYears: number[][];
    setDate: (date: string) => void;
};

const months = monthNamesShort();

// TODO possible optimizations around the years and enabledMonthIndiciesForSelectedYear lists.
export const MonthYearList = ({ startingDate, monthAndYears, setDate }: MonthYearListProps) => {
    const years = Array.from(new Set(monthAndYears.map(my => my[1])));
    const [startingMonth, startingYear] = getMonthAndYearFromDate(startingDate);
    const [selectedYearIndex, setSelectedYearIndex] = React.useState(years.indexOf(startingYear));
    const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(startingMonth);
    const [currentYearIndex, setCurrentYearIndex] = React.useState(years.indexOf(startingYear));
    const [currentMonthIndex, setCurrentMonthIndex] = React.useState(startingMonth);
    const enabledMonthIndiciesForSelectedYear = monthAndYears
        .filter(my => my[1] === years[selectedYearIndex])
        .map(my => my[0]);

    React.useEffect(() => {
        setSelectedYearIndex(years.indexOf(startingYear));
        setSelectedMonthIndex(startingMonth);
        setCurrentYearIndex(years.indexOf(startingYear));
        setCurrentMonthIndex(startingMonth);
        // TODO there has to be a better way to handle the array as a useEffect dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startingDate, JSON.stringify(monthAndYears)]);

    // When selecting the year, we don't want to send a new date yet,
    // they still need to pick the month. If we are re-selecting the
    // year that is currently active, re-select the month so that it
    // appears correctly.
    const selectYear = (index: number) => {
        setSelectedYearIndex(index);
        setSelectedMonthIndex(index !== currentYearIndex ? -1 : currentMonthIndex);
    };

    // When we select the month, we need to send the new year/month
    // back up to our parent. We also need to update the active
    // year/month combination, so if they navigate the list we can
    // re-select the year/month to display correctly.
    const selectMonth = (month: string, index: number) => {
        setDate(`1 ${month} ${years[selectedYearIndex]}`);
        setSelectedMonthIndex(index);

        setCurrentYearIndex(selectedYearIndex);
        setCurrentMonthIndex(index);
    };

    return (
        <Pane>
            {years.map((year, yearIndex) => (
                <Tablist key={year} display='flex' flexDirection='column' justifyContent='flex-start' width={80}>
                    <Tab
                        id={year.toString()}
                        onSelect={() => selectYear(yearIndex)}
                        isSelected={yearIndex === selectedYearIndex}
                        direction='vertical'
                    >
                        {year}
                    </Tab>
                    {yearIndex === selectedYearIndex && (
                        <Tablist display='flex' flexDirection='column' justifyContent='space-around' width={80}>
                            {months.map((month, monthIndex) => (
                                <Tab
                                    key={month}
                                    id={month}
                                    onSelect={() => selectMonth(month, monthIndex)}
                                    isSelected={monthIndex === selectedMonthIndex}
                                    display='flex'
                                    justifyContent='center'
                                    direction='vertical'
                                    disabled={enabledMonthIndiciesForSelectedYear.indexOf(monthIndex) < 0}
                                >
                                    {month}
                                </Tab>
                            ))}
                        </Tablist>
                    )}
                </Tablist>
            ))}
        </Pane>
    );
};
