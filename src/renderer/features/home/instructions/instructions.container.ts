import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { AccountSelectors } from '../../../store/account/account.selectors';
import { AutoCategorySelectors } from '../../../store/auto-category/auto-category.selectors';
import { CategorySelectors } from '../../../store/category/category.selectors';
import { RecordSelectors } from '../../../store/record/record.selectors';
import { IStore } from '../../../store/store.interface';
import { Instructions } from './instructions.component';
import { IInstructionsProps } from './instructions.props.interface';

type StateProps = IInstructionsProps;

const hasAccounts = createSelector(AccountSelectors.accounts, accounts => Object.keys(accounts).length > 0);

const hasRecords = createSelector(RecordSelectors.records, records =>
  Object.keys(records).some(key => records[key]?.length > 0)
);

const hasCategories = createSelector(CategorySelectors.selectDisplayCategories, categories => Object.keys(categories).length > 0);

const hasAutoCategory = createSelector(AutoCategorySelectors.autoCategories, autoCategories =>
  Object.keys(autoCategories).some(key => autoCategories[key].length > 0)
);

const hasSplitRecords = createSelector(RecordSelectors.records, records =>
  Object.keys(records).some(key => records[key].some(record => record.splitRecords?.length > 0))
);

const mapStateToProps = (state: IStore): StateProps => ({
  hasAccounts: hasAccounts(state),
  atLeastOneAccountHasRecords: hasRecords(state),
  hasCategories: hasCategories(state),
  hasAutoCategories: hasAutoCategory(state),
  hasSplitRecords: hasSplitRecords(state),
});

export const InstructionsContainer = connect(mapStateToProps)(Instructions);
