/* eslint-disable no-underscore-dangle */
import React, { FormEvent, useCallback } from 'react';
import { Modal as ModalAndt, Input, Button } from 'antd';
import { CommentsType } from 'types';
import Loader from 'components/Loader';
import Comment from 'components/Comment';
import { getToken } from 'helpers/token';
import useBooks from 'hooks/api/useBooks';
import useModal from 'hooks/useModal';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import routers from 'const/routers';

const Modal: React.FC = () => {
  const styles = useStyles();
  const [value, setValue] = React.useState('');
  const { bookComments, addBookComment, setComment } = useBooks();
  const { modalData, setModal } = useModal();

  const handleOk = () => {
    setModal({ show: false });
  };

  const handleCancel = () => {
    setModal({ show: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addBookComment({
        postData: { bookId: modalData.id, text: value },
        successCallback: (res) => {
          setComment(res);
        },
      });
      // fetchAddComment(value);
      setValue('');
    },
    [value, modalData.id],
  );

  return (
    <ModalAndt title="Кометарии" visible={modalData.show} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <div className={styles.container}>
        <div className={styles.comment}>
          {modalData.loader ? (
            <Loader />
          ) : (
            bookComments.map((item: CommentsType) => <Comment key={item._id} {...item} />)
          )}
        </div>
        {getToken() ? (
          <form className={styles.form} onSubmit={onSubmit}>
            <Input style={{ width: '100%' }} value={value} onChange={handleChange} />
            <Button htmlType="submit" type="primary">
              Send
            </Button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            Для добавления комментариев
            <Link to={routers.getSignup()}>авторизуйтесь</Link>
          </div>
        )}
      </div>
    </ModalAndt>
  );
};

const useStyles = createUseStyles({
  container: {
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  comment: {
    maxHeight: '300px',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: '5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset',
      backgroundColor: '#f9f9fd',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: 'linear-gradient(180deg, #00c6fb, #005bea)',
    },
  },
  form: {
    display: 'flex',
    marginTop: '30px',
  },
});

export default Modal;
