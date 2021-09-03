import { useMemo, useReducer } from 'react';
import { bindActionCreators } from 'redux';

const wrapActionsWithLoadState = (actions, isFetchingDispatch) =>
  Object.keys(actions).reduce(
    (acc, A) => ({
      ...acc,
      [A]: (args, { withFetching = true } = {}) => {
        if (withFetching) {
          isFetchingDispatch({ type: A, payload: true });
        }
        return actions[A](args).then((res) => {
          if (withFetching) {
            isFetchingDispatch({ type: A, payload: false });
          }
          return res;
        });
      },
    }),
    actions,
  );

const isFetchingReducer = (state, action) => ({
  ...state,
  [`${[action.type]}IsFetching`]: action.payload,
});

export default (actionCreators, dispatch, { reducer = isFetchingReducer, initialReducerState = {} } = {}) => {
  const actions = useMemo(() => bindActionCreators(actionCreators, dispatch), [actionCreators, dispatch]);

  const [isFetchingState, isFetchingDispatch] = useReducer(reducer, initialReducerState);

  const actionsWithIsFetching = useMemo(
    () => wrapActionsWithLoadState(actions, isFetchingDispatch),
    [actions, isFetchingDispatch],
  );

  return [actionsWithIsFetching, isFetchingState];
};
