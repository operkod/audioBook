import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getBooks from 'queries/getBooks';
import getBookLike from 'queries/getBookLike';
import getBookComment from 'queries/getBookComment';
import addBookComment from 'queries/addBookComment';
import { bindActionCreators } from 'redux';
import { updateEntities } from 'redux-query';
import { updateUtils } from 'actions';
import useActionsWithFetchingState from '../useActionsWithFetchingState';
import { arraySelector, utilsSelector } from './selectors';

export type RequestBookParamsType = {
  page: number;
  search: string;
};
const initialRequestBookParams: RequestBookParamsType = {
  page: 0,
  search: '',
};

const useAuth = () => {
  const selector = useCallback(
    (state) => ({
      booksData: arraySelector(state, 'booksData'),
      bookComments: arraySelector(state, 'bookComments'),
      requestBookParams: utilsSelector(state, 'requestBookParams', initialRequestBookParams),
    }),
    [],
  );

  const dispatch = useDispatch();
  const data = useSelector(selector);

  const actionCreators = useMemo(
    () => ({
      getBooks,
      getBookLike,
      getBookComment,
      addBookComment,
    }),
    [],
  );

  const actionWithoutIsFetching = useMemo(
    () =>
      bindActionCreators(
        {
          setComment: (newComment) =>
            updateEntities({
              bookComments: (prev: Array<any>) => [...prev, newComment],
            }),
          setRequestBookParams: (requestBookParams: RequestBookParamsType) => updateUtils({ requestBookParams }),
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
