import path from 'path';
import React, { createContext, useContext, useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WorkerEventType } from './models/_worker-event.type';
import { WorkerReturnType } from './models/_worker-return.type';
import { PendingRecordActions } from './store/pending-record/pending-record.actions';
import { RecordActions } from './store/record/record.actions';

export type BackgroundWorkerContextType = {
    invokeBackgroundTask?: (eventType: WorkerEventType, args: Array<unknown>) => void;
};

export const BackgroundWorkerContext = createContext<BackgroundWorkerContextType>({});

export const useBackgroundWorkerContext = () => useContext(BackgroundWorkerContext);

// eslint-disable-next-line @typescript-eslint/ban-types
const lookup: Record<WorkerReturnType, Function> = {
    NEW_RECORDS_PARSED: PendingRecordActions.importNewRecords,
    NEW_RECORDS_ERROR: PendingRecordActions.importError,
    NEW_RECORDS_MERGED: RecordActions.saveNewRecords,
};

type BackgroundWorkerProviderProps = {
    children: React.ReactNode;
};

/**
 * Creates a context provider that gives access to the worker to perform background tasks.
 */
export const BackgroundWorkerProvider = ({ children }: BackgroundWorkerProviderProps) => {
    const dispatch = useDispatch();
    const [worker] = useState(() => new Worker(path.resolve(__dirname + '/background.worker.js'), { type: 'module' }));

    const invokeBackgroundTask = useCallback(
        (eventType: WorkerEventType, args: Array<unknown>) => {
            worker.postMessage({ eventType, args });
        },
        [worker]
    );

    useEffect(() => {
        if (!worker) {
            return;
        }

        const handleEvent = (event: MessageEvent) => {
            const { data } = event;
            dispatch(lookup[data.type](...data.args));
        };

        worker.addEventListener('message', handleEvent);

        return () => {
            worker.removeEventListener('message', handleEvent);
        };
    }, [worker, dispatch]);

    const context = useMemo<BackgroundWorkerContextType>(() => ({ invokeBackgroundTask }), [invokeBackgroundTask]);

    return <BackgroundWorkerContext.Provider value={context}>{children}</BackgroundWorkerContext.Provider>;
};
