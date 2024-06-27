import React from 'react';
import { CartesianGrid, BarChart, XAxis, YAxis, Bar, Cell, Tooltip, ReferenceLine } from 'recharts';
import { useDisplayCategories } from '../../hooks/categories/use-display-categories.hook';
import { useRecordsByDate } from '../../hooks/records/use-records-by-date.hook';

type AccountCategoryTotalsChartProps = {
    /**
     * The ID of the account to display.
     */
    accountId: string;

    /**
     * The first date of the month to get the data for.
     */
    date: string;
};

export const AccountCategoryTotalsChart = ({ accountId, date }: AccountCategoryTotalsChartProps) => {
    const { records } = useRecordsByDate(accountId, date);
    const { categories } = useDisplayCategories();

    let data = categories?.map(c => ({ categoryId: c.id, color: c.color, name: c.name, Total: 0.0 }));

    for (const category of data) {
        const categoryId = category.categoryId;
        const total = records
            ?.filter(r => r.categoryId || r.splitRecords)
            .flatMap(r => (r.splitRecords ? [r, ...r.splitRecords] : [r]))
            .filter(r => r.categoryId === categoryId)
            // TODO do categories need expense or income tags so that we can change the credit or debit to be +/-?
            .map(r => (r.credit > 0 ? r.credit : r.debit > 0 ? -r.debit : 0.0))
            .reduce((sum, value) => (sum += value), 0.0);
        category.Total = parseFloat(total.toFixed(2) || '0.0');
    }

    // Don't display empty categories.
    data = data.filter(d => d.Total !== 0.0);

    // Don't render the chart if there are no categories with totals.
    if (data.length === 0) {
        return null;
    }

    // Get the colors for the remaining categories.
    const colors = data.map(c => c.color || '#333');

    return (
        <BarChart
            width={100 * (data.length > 3 ? data.length : 3)}
            height={300}
            data={data}
            margin={{
                top: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            {data.length > 0 && <Tooltip />}
            <ReferenceLine y={0} stroke='#000' />
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Bar dataKey='Total' label={{ position: 'top' } as any}>
                {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Bar>
        </BarChart>
    );
};
