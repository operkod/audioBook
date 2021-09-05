import { useCallback, useMemo } from 'react';
import { updateEntities } from 'redux-query';
import { useDispatch, useSelector } from 'react-redux';
import getUserData from 'queries/getUserData';
import editUserAvatar from 'queries/editUserAvatar';
import { bindActionCreators } from 'redux';
import useActionsWithFetchingState from '../useActionsWithFetchingState';
import { objectSelector } from './selectors';

const useUserData = () => {
  const selector = useCallback(
    (state) => ({
      userData: objectSelector(state, 'userData'),
    }),
    [],
  );

  const dispatch = useDispatch();
  const data = useSelector(selector);

  const actionCreators = useMemo(
    () => ({
      getUserData,
      editUserAvatar,
    }),
    [],
  );

  const actionWithoutIsFetching = useMemo(
    () =>
      bindActionCreators(
        {
          logout: () =>
            updateEntities({
              userData: () => ({}),
            }),
          updateAvatar: (avatar) =>
            updateEntities({
              userData: (prev: object) => ({ ...prev, avatar }),
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

export default useUserData;
