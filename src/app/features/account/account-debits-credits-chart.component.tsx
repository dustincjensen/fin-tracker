import React, { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useRecordsByDate } from '../../hooks/records/use-records-by-date.hook';
import { formatDate } from '../../utils/date.utils';

export type AccountDebitsCreditsChartProps = {
    /**
     * The ID of the account to display.
     */
    accountId: string;

    /**
     * The first date of the month to get the data for.
     */
    date: string;
};

const useAccountDebitsCreditsChart = (accountId: string, date: string) => {
    const { records } = useRecordsByDate(accountId, date);
    return {
        records: useMemo(() => records?.map(r => ({ ...r, date: formatDate(r.date) })), [records]),
    };
};

export const AccountDebitsCreditsChart = ({ accountId, date }: AccountDebitsCreditsChartProps) => {
    const { records } = useAccountDebitsCreditsChart(accountId, date);

    const credits = records
        .filter(r => !!r.credit)
        .map(r => r.credit)
        .reduce((prev, curr) => prev + curr, 0);
    const debits = records
        .filter(r => !!r.debit)
        .map(r => r.debit)
        .reduce((prev, curr) => prev + curr, 0);

    const data = [
        {
            name: 'Credits',
            value: credits.toFixed(2),
            color: '#4caf50',
        },
        {
            name: 'Debits',
            value: debits.toFixed(2),
            color: '#f44336',
        },
    ];

    return (
        <ResponsiveContainer minWidth={300} width='100%' height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip isAnimationActive={false} />
                <ReferenceLine y={0} stroke='#000' />
                <Bar dataKey='value' label={{ position: 'top' } as never}>
                    {data.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={data[index].color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
