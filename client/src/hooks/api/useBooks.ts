import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getBooks from 'queries/getBooks';
import getBookLike from 'queries/getBookLike';
import useActionsWithFetchingState from '../useActionsWithFetchingState';
import { arraySelector } from './selectors';

const useAuth = () => {
  const selector = useCallback(
    (state) => ({
      booksData: arraySelector(state, 'booksData'),
    }),
    [],
  );

  const dispatch = useDispatch();
  const data = useSelector(selector);

  const actionCreators = useMemo(
    () => ({
      getBooks,
      getBookLike,
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
