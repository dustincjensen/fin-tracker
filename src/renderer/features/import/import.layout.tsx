import * as React from 'react';
import { NewRecordsContainer } from './new-records.container';
import { PendingRecordsContainer } from './pending-records.container';
import { ActionPendingRecordsContainer } from './action-pending-records.container';
import './import.layout.scss';

export interface IImportLayoutStateProps {
  hasPendingRecords: boolean;
}

export interface IImportLayoutProps extends IImportLayoutStateProps {}

export class ImportLayout extends React.Component<IImportLayoutProps> {
  public render() {
    const { hasPendingRecords } = this.props;
    return (
      <div className='imports'>
        {!hasPendingRecords && <NewRecordsContainer />}
        {hasPendingRecords && <ActionPendingRecordsContainer />}
        {hasPendingRecords && <PendingRecordsContainer />}
      </div>
    );
  }
}
