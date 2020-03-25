import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { ActionPendingRecordsContainer } from './action-pending-records.container';
import { IImportLayoutProps } from './import.props.interface';
import { NewRecordsContainer } from './new-records.container';
import { PendingRecordsContainer } from './pending-records.container';

export class ImportLayout extends React.Component<IImportLayoutProps> {
  public render() {
    const { hasPendingRecords } = this.props;
    const { accountId } = this.props.match.params;

    return (
      <ErrorBoundary>
        <Pane display='grid' gridGap={20}>
          {!hasPendingRecords && <NewRecordsContainer accountId={accountId} />}
          {hasPendingRecords && <ActionPendingRecordsContainer />}
          {hasPendingRecords && <PendingRecordsContainer />}
        </Pane>
      </ErrorBoundary>
    );
  }
}
