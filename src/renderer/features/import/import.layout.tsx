import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';
import { ActionPendingRecordsContainer } from './action-pending-records/action-pending-records.container';
import { NewRecordsContainer } from './new-records/new-records.container';
import { PendingRecordsContainer } from './pending-records/pending-records.container';

export const ImportLayout = (props: RouteComponentProps<{ accountId?: string }>) => {
  const hasPendingRecords = useSelector(PendingRecordSelectors.pendingRecords).accountId != undefined;
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
