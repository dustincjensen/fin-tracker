import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { ActionPendingRecordsContainer } from './action-pending-records.container';
import { IImportLayoutProps } from './import.props.interface';
import { NewRecordsContainer } from './new-records.container';
import { PendingRecordsContainer } from './pending-records.container';

export const ImportLayout = (props: IImportLayoutProps) => {
  const { hasPendingRecords } = props;
  const { accountId } = props.match.params;

  return (
    <ErrorBoundary>
      <Pane height='100%'>
        {!hasPendingRecords && <NewRecordsContainer accountId={accountId} />}
        {hasPendingRecords && (
          <>
            <Pane marginBottom={20}>
              <ActionPendingRecordsContainer />
            </Pane>
            <PendingRecordsContainer />
          </>
        )}
      </Pane>
    </ErrorBoundary>
  );
};
