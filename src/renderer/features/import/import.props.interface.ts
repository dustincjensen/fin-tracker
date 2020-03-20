import { RouteComponentProps } from 'react-router-dom';

export interface IImportLayoutProps extends IImportLayoutStateProps, RouteComponentProps<{ accountId?: string }> {}

export interface IImportLayoutStateProps {
  /**
   * Whether or not the import has pending records.
   */
  hasPendingRecords: boolean;
}
