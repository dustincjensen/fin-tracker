import { connect } from "react-redux";
import { IStore } from "../../store/store.interface";
import { Instructions } from './instructions.component';
import { IInstructionsStateProps } from "./instructions.props.interface";

const mapStateToProps = (state: IStore): IInstructionsStateProps => {
  const hasAccounts = Object.keys(state.accounts.accounts).length > 0;
  const atLeastOneAccountHasRecords = Object.keys(state.records.records).some(key => state.records.records[key]?.length > 0);
  const hasCategories = Object.keys(state.categories.categories).length > 0;
  const hasAutoCategories = Object.keys(state.autoCategories.autoCategories).some(key => state.autoCategories.autoCategories[key]?.length > 0);
  const hasSplitRecords = Object.keys(state.records.records).some(key => state.records.records[key].some(r => r.splitRecords?.length > 0));

  return {
    hasAccounts,
    atLeastOneAccountHasRecords,
    hasCategories,
    hasAutoCategories,
    hasSplitRecords,
  };
};

export const InstructionsContainer = connect(mapStateToProps)(Instructions);