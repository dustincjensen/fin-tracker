import * as React from 'react';
import { NewRecordsContainer } from './new-records.container';
import { PendingRecordsContainer } from './pending-records.container';
import { ActionPendingRecordsContainer } from './action-pending-records.container';
import './upload.layout.scss';

export interface IUploadLayoutStateProps {
  hasPendingRecords: boolean;
}

export interface IUploadLayoutProps extends IUploadLayoutStateProps { }

export class UploadLayout extends React.Component<IUploadLayoutProps> {
  public render() {
    const { hasPendingRecords } = this.props;
    return (
      <div className="uploads">
        {!hasPendingRecords && <NewRecordsContainer />}
        {hasPendingRecords && [
          // This is causing a unique key React error.
          <ActionPendingRecordsContainer />,
          <PendingRecordsContainer />
        ]}
      </div>
    );
  }
}
