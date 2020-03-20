import { produce, Draft, Immutable } from 'immer';

/**
 * Returns a immer reducer that looks up the action and performs it.
 * It provides the action payload to the reducer action.
 *
 * @param actionList        The actions the reducer supports.
 * @param initialState      The initial state of the reducer.
 */
export function createDraftReducer<T>(actionList: { [type: string]: Function }, initialState: Immutable<T>) {
  return produce((draft: Draft<T>, action) => {
    const actionToPerform = actionList[action.type];
    if (!actionToPerform) {
      return draft;
    }
    return actionToPerform(draft, action.payload);
  }, initialState);
}
