import { IRecord } from '../../../store/record/record.interface';

export interface IAccountBalanceLineChartProps {
  /**
   * The records to build the chart from.
   */
  records: IRecord[];
}
