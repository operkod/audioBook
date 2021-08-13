/*eslint-disable */
import './Modal.scss';
import React from 'react';
import { StateType } from 'redux/reducer';
import { connect } from 'react-redux';
import { Modal as ModalBase, Input, Button } from 'antd';
import { Actions } from 'redux/action/comments';
import { CommentsType } from 'types';
import Loader from 'components/Loader';
import { Comment } from 'components';
import { getComments, getCommentsShow, getAuth, getCommentsLoader } from 'redux/selectors';

type StateProps = {
  isShow: boolean;
  items: Array<CommentsType>;
  isAuth: boolean;
  isLoader: boolean;
};
type DispatchProps = {
  isShowComments: (v: boolean) => void;
  fetchAddComment: (v: string) => void;
};
type Props = StateProps & DispatchProps;

const Modal: React.FC<Props> = ({ isLoader, isShow, items, isAuth, isShowComments, fetchAddComment }) => {
  const [value, setValue] = React.useState('');

  const handleOk = () => {
    isShowComments(false);
  };

  const handleCancel = () => {
    isShowComments(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    fetchAddComment(value);
    setValue('');
  };

  return (
    <ModalBase title="Кометарии" visible={isShow} onOk={handleOk} onCancel={handleCancel} footer={null}>
      {isLoader ? <Loader /> : items.map((item: CommentsType) => <Comment key={item._id} {...item} />)}
      {isAuth && (
        <div style={{ display: 'flex' }}>
          <Input style={{ width: '100%' }} value={value} onChange={handleChange} />
          <Button type="primary" onClick={handleClick}>
            Send
          </Button>
        </div>
      )}
    </ModalBase>
  );
};

const mapStateToProps = (state: StateType): StateProps => ({
  items: getComments(state),
  isShow: getCommentsShow(state),
  isAuth: getAuth(state),
  isLoader: getCommentsLoader(state),
});
const mapDispatchToProps: DispatchProps = {
  isShowComments: Actions.isShowComments,
  fetchAddComment: Actions.fetchComments,
};

export default connect<StateProps, DispatchProps, any, StateType>(mapStateToProps, mapDispatchToProps)(Modal);
