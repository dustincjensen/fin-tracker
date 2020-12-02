import { IRecord } from '../../../store/record/record.interface';

export interface IAccountBalanceLineChartProps {
  /**
   * The records to build the chart from.
   */
  records: IRecord[];

  /**
   * The ID of the account to display.
   */
  accountId: string;

  /**
   * The first date of the month to get the data for.
   */
  date: string;
}
