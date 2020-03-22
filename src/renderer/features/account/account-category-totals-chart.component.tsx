import * as React from 'react';
import { CartesianGrid, BarChart, XAxis, YAxis, Bar, Cell } from 'recharts';
import { IAccountCategoryTotalsChartProps } from './account-category-totals-chart.props.interface';

// TODO clean up the graph a bit more.
export class AccountCategoryTotalsChart extends React.Component<IAccountCategoryTotalsChartProps> {
  render() {
    const { records, categories } = this.props;

    let data = categories.map(c => ({ categoryId: c.id, color: c.color, name: c.name, total: 0.0 }));
    for (const category of data) {
      const categoryId = category.categoryId;
      const total = records
        .filter(r => r.categoryId === categoryId)
        .map(r => r.credit || r.debit)
        .reduce((accumulator, currentValue) => (accumulator += currentValue), 0.0);
      category.total = parseFloat(total.toFixed(2));
    }

    // Don't display empty categories.
    data = data.filter(d => d.total > 0.0);

    // Get the colors for the remaining categories.
    const colors = data.map(c => c.color || '#333');

    return (
      <BarChart
        width={60 * categories.length}
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
