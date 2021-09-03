import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getSignUp from 'queries/getSignUp';
import useActionsWithFetchingState from '../useActionsWithFetchingState';
import { objectSelector } from './selectors';

const useSignUp = () => {
  const selector = useCallback(
    (state) => ({
      getSignUp: objectSelector(state, 'getSignUp'),
    }),
    [],
  );

  const dispatch = useDispatch();
  const data = useSelector(selector);

  const actionCreators = useMemo(
    () => ({
      getSignUp,
    }),
    [],
  );

  const [actions, isFetchingState] = useActionsWithFetchingState(actionCreators, dispatch);
  return {
    ...data,
    ...actions,
    ...isFetchingState,
  };
};

export default useSignUp;
