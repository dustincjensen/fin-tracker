import { IRecord } from '../../store/records/record.interface';

export interface IAccountBalanceLineChartProps {
  /**
   * The records to build the chart from.
   */
  records: IRecord[];
}
