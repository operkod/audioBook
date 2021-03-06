import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAuth from 'queries/getAuth';
import useActionsWithFetchingState from '../useActionsWithFetchingState';
import { objectSelector } from './selectors';

const useAuth = () => {
  const selector = useCallback(
    (state) => ({
      authData: objectSelector(state, 'authData'),
    }),
    [],
  );

  const dispatch = useDispatch();
  const data = useSelector(selector);

  const actionCreators = useMemo(
    () => ({
      getAuth,
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

export default useAuth;
