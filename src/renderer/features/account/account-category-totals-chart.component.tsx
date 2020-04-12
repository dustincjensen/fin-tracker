import * as React from 'react';
import { CartesianGrid, BarChart, XAxis, YAxis, Bar, Cell } from 'recharts';
import { IAccountCategoryTotalsChartProps } from './account-category-totals-chart.props.interface';

export class AccountCategoryTotalsChart extends React.Component<IAccountCategoryTotalsChartProps> {
  render() {
    const { records, categories } = this.props;

    let data = categories?.map(c => ({ categoryId: c.id, color: c.color, name: c.name, total: 0.0 }));
    for (const category of data) {
      const categoryId = category.categoryId;
      const total = records
        ?.filter(r => r.categoryId || r.splitRecords)
        .flatMap(r => (r.splitRecords ? [r, ...r.splitRecords] : [r]))
        .filter(r => r.categoryId === categoryId)
        // TODO do categories need expense or income tags so that we can change the credit or debit to be +/-?
        .map(r => (r.credit > 0 ? r.credit : r.debit > 0 ? -r.debit : 0.0))
        .reduce((sum, value) => (sum += value), 0.0);
      category.total = parseFloat(Math.abs(total).toFixed(2) || '0.0');
    }

    // Don't display empty categories.
    data = data.filter(d => d.total > 0.0);

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
        <Bar dataKey='total' label={{ position: 'top' }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    );
  }
}
