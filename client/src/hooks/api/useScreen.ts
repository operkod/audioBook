import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUtils } from 'actions';
import { utilsSelector } from './selectors';

export type ScreenType = {
  width: number;
  height: number;
};
const initialScreen: ScreenType = {
  width: 0,
  height: 0,
};

const useAuth = () => {
  const selector = useCallback(
    (state) => ({
      screenData: utilsSelector(state, 'screenData', initialScreen),
    }),
    [],
  );

  const dispatch = useDispatch();
  const data = useSelector(selector);

  const actionWithoutIsFetching = useMemo(
    () =>
      bindActionCreators(
        {
          setScreenData: (screenData: ScreenType) => updateUtils({ screenData }),
        },
        dispatch,
      ),
    [dispatch],
  );

  return {
    ...data,
    ...actionWithoutIsFetching,
  };
};

export default useAuth;
