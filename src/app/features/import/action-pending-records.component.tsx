import { Button, majorScale, Pane, FormField, Text, CrossIcon, TickIcon } from 'evergreen-ui';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBackgroundWorkerContext } from '../../background-worker-provider.component';
import { AccountSelectors } from '../../store/account/account.selectors';
import { clearImportedRecords } from '../../store/pending-record/pending-record-slice';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';
import { RecordSelectors } from '../../store/record/record.selectors';
import { IStore } from '../../store/store.interface';
import { accountTypeLabels } from '../../utils/account.utils';

export const ActionPendingRecords = () => {
    const dispatch = useDispatch();
    const pendingRecords = useSelector(PendingRecordSelectors.pendingRecords);
    const account = useSelector((state: IStore) => AccountSelectors.account(state, pendingRecords?.accountId));
    const existingRecords = useSelector((state: IStore) =>
        RecordSelectors.recordsByAccountId(state, pendingRecords?.accountId)
    );
    const worker = useBackgroundWorkerContext();

    const accept = useCallback(() => {
        worker.invokeBackgroundTask?.('NEW_RECORDS_MERGED', [
            account?.startingBalance ?? 0,
            pendingRecords?.records,
            existingRecords,
        ]);
    }, [worker, account?.startingBalance, pendingRecords?.records, existingRecords]);

    const clear = useCallback(() => dispatch(clearImportedRecords()), [dispatch]);

    return (
        <Pane>
            <Pane display='flex' justifyContent='space-between' border padding={20} background='tint1' borderRadius={5}>
                <Pane>
                    <Pane display='flex'>
                        <FormField label='Account Name' marginBottom={majorScale(3)} minWidth={200} width='100%'>
                            <Text>{account?.name}</Text>
                        </FormField>
                        <FormField label='Account Type' marginBottom={majorScale(3)} minWidth={200} width='100%'>
                            <Text>{accountTypeLabels[account?.accountType]}</Text>
                        </FormField>
                    </Pane>
                    <FormField label='Imported File'>
                        <Text>{pendingRecords?.fileName}</Text>
                    </FormField>
                </Pane>
                <Pane display='flex' flexDirection='column' justifyContent='space-around'>
                    <Button
                        appearance='primary'
                        intent='success'
                        iconBefore={TickIcon}
                        height={majorScale(5)}
                        marginBottom={20}
                        onClick={accept}
                    >
                        Accept Records
                    </Button>
                    <Button
                        appearance='primary'
                        intent='danger'
                        iconBefore={CrossIcon}
                        height={majorScale(5)}
                        onClick={clear}
                    >
                        Clear Records
                    </Button>
                </Pane>
            </Pane>
        </Pane>
    );
};
