import { WorkerEventType } from '../models/_worker-event.type';
import * as mergeFileRoutes from './routes/merge-file.routes';
import * as parseFileRoutes from './routes/parse-file.routes';

declare let self: DedicatedWorkerGlobalScope;
export {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const eventLookup: Record<WorkerEventType, any> = {
  NEW_QUICKEN_RECORDS_SELECTED: parseFileRoutes.parseQuickenToRecords,
  NEW_QFX_RECORDS_SELECTED: parseFileRoutes.parseQfxToRecords,
  NEW_RECORDS_MERGED: mergeFileRoutes.mergeRecords,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
self.onmessage = (e: MessageEvent<{ eventType: WorkerEventType; args: any }>) => {
  const { data } = e;

  console.log('Starting event: ', data.eventType);
  const start = performance.now();

  const output = eventLookup[data.eventType](...data.args);
  self.postMessage(output);

  const finish = performance.now();
  console.log(`(${(finish - start).toFixed(3)}ms) Finishing event: ${data.eventType}`);
};
