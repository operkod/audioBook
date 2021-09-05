import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from 'actions';
import { bindActionCreators } from 'redux';
import { modalSelector } from './api/selectors';

const useModal = () => {
  const selector = useCallback(
    (state) => ({
      modalData: modalSelector(state),
    }),
    [],
  );

  const dispatch = useDispatch();

  const data = useSelector(selector);

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          setModal: (payload) => setModal(payload),
        },
        dispatch,
      ),
    [dispatch],
  );

  return {
    ...data,
    ...actions,
  };
};

export default useModal;
