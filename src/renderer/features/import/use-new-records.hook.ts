import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActiveBankAccounts } from '../../hooks/accounts/use-active-bank-accounts.hook';
import { IAccount } from '../../store/account/account.interface';
import { IAutoCategory } from '../../store/auto-category/auto-category.interface';
import { AutoCategorySelectors } from '../../store/auto-category/auto-category.selectors';
import { ParseType } from '../../store/pending-record/parse.type';
import { mapParseType } from '../../store/pending-record/parse.type.mapper';
import { PendingRecordActions } from '../../store/pending-record/pending-record.actions';
import { PendingRecordSelectors } from '../../store/pending-record/pending-record.selectors';

export const useNewRecords = () => {
  const { activeBankAccounts: accounts } = useActiveBankAccounts();
  const autoCategories = useSelector(AutoCategorySelectors.autoCategories);
  const error = useSelector(PendingRecordSelectors.error);

  const dispatch = useDispatch();

  const importAction = useCallback(
    (account: IAccount, autoCategories: IAutoCategory[], file, parseType: ParseType) => {
      dispatch(PendingRecordActions.clearError());
      const parseAction = mapParseType(parseType);
      return parseAction(dispatch, account.id, file.path, autoCategories, account.accountType);
    },
    [dispatch]
  );

  return {
    accounts,
    autoCategories,
    // The error that occurred when trying to import, if any.
    error,
    importAction,
  };
};
