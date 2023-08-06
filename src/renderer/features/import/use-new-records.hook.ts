import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useBackgroundWorkerContext } from '../../background-worker-provider.component';
import { useActiveBankAccounts } from '../../hooks/accounts/use-active-bank-accounts.hook';
import { WorkerEventType } from '../../models/_worker-event.type';
import { IAccount } from '../../store/account/account.interface';
import { IAutoCategory } from '../../store/auto-category/auto-category.interface';
import { AutoCategorySelectors } from '../../store/auto-category/auto-category.selectors';
import { ParseType } from '../../store/pending-record/parse.type';
import { PendingRecordActions } from '../../store/pending-record/pending-record.actions';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';

const parseTypeLookup: Record<ParseType, WorkerEventType> = {
  QFX: 'NEW_QFX_RECORDS_SELECTED',
  Quicken: 'NEW_QUICKEN_RECORDS_SELECTED',
};

export const useNewRecords = () => {
  const dispatch = useDispatch();
  const { activeBankAccounts: accounts } = useActiveBankAccounts();
  const autoCategories = useSelector(AutoCategorySelectors.autoCategories);
  const error = useSelector(PendingRecordSelectors.error);
  const worker = useBackgroundWorkerContext();

  const importAction = useCallback(
    (account: IAccount, autoCategories: IAutoCategory[], file, parseType: ParseType) => {
      dispatch(PendingRecordActions.clearError());
      const type = parseTypeLookup[parseType];
      worker.invokeBackgroundTask?.(type, [account.id, file, autoCategories, account.accountType]);
    },
    [worker, dispatch]
  );

  return {
    accounts,
    autoCategories,
    // The error that occurred when trying to import, if any.
    error,
    importAction,
  };
};
