import { useCallback, useMemo } from 'react';
import { updateEntities } from 'redux-query';
import { useDispatch, useSelector } from 'react-redux';
import getAuth from 'queries/getAuth';
import { bindActionCreators } from 'redux';
// @ts-ignore
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

  const actionWithoutIsFetching = useMemo(
    () =>
      bindActionCreators(
        {
          logout: () =>
            updateEntities({
              user: () => ({}),
            }),
        },
        dispatch,
      ),
    [dispatch],
  );

  const [actions, isFetchingState] = useActionsWithFetchingState(actionCreators, dispatch);
  return {
    ...data,
    ...actions,
    ...isFetchingState,
    ...actionWithoutIsFetching,
  };
};

export default useAuth;
