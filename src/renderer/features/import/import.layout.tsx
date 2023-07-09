import { Pane } from 'evergreen-ui';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.component';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';
import { ActionPendingRecords } from './action-pending-records.component';
import { NewRecords } from './new-records.component';
import { PendingRecords } from './pending-records.component';

export const ImportLayout = (props: RouteComponentProps<{ accountId?: string }>) => {
  const hasPendingRecords = useSelector(PendingRecordSelectors.pendingRecords).accountId != undefined;
  const { accountId } = props.match.params;

  return (
    <ErrorBoundary>
      <Pane height='100%' padding={20}>
        {!hasPendingRecords && <NewRecords key={accountId} accountId={accountId} />}
        {hasPendingRecords && (
          <>
            <Pane marginBottom={20}>
              <ActionPendingRecords />
            </Pane>
            <PendingRecords />
          </>
        )}
      </Pane>
    </ErrorBoundary>
  );
};
