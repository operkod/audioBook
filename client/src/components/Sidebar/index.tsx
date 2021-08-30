import React, { ChangeEvent, useCallback, useState, useRef, useEffect, FC } from 'react';
import Block from 'components/Block';
import { createUseStyles } from 'react-jss';
import { Avatar, Button, Comment, Input } from 'antd';
import useSocketChat from 'hooks/useSocketChat';

const { TextArea } = Input;

type PropsTypes = {
  className?: string;
};

const Sidebar: FC<PropsTypes> = ({ className = '' }) => {
  const styles = useStyles();
  const [formValue, setFormValue] = useState('');
  const { messages, addMessage } = useSocketChat();
  const myRef = useRef(null);

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue(event.target.value);
  };

  const onClick = useCallback(() => {
    if (formValue) {
      addMessage(formValue);
    }
    setFormValue('');
  }, [formValue, addMessage]);

  useEffect(() => {
    if (myRef.current) {
      // @ts-ignore
      myRef.current.scrollTo(0, 99999);
    }
  }, [messages]);

  return (
    <Block className={`${styles.sidebar} ${className}`}>
      <div className={styles.wrap}>
        <strong className={styles.header}>Online Chat</strong>
        <div className={styles.main} ref={myRef}>
          {messages.map((item, index) => (
            <Comment
              // eslint-disable-next-line react/no-array-index-key
              key={item.id + index}
              author={item.author}
              avatar={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Avatar
                  src={item.avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                  alt={item.author || 'salsa'}
                />
              }
              content={<p>{item.message}</p>}
            />
          ))}
        </div>
        <div>
          <TextArea
            placeholder="message"
            autoSize={{ minRows: 1, maxRows: 4 }}
            value={formValue}
            onChange={onChangeHandler}
          />
          <Button type="primary" onClick={onClick} style={{ marginTop: '5px' }}>
            Отправить
          </Button>
        </div>
      </div>
    </Block>
  );
};

const useStyles = createUseStyles({
  sidebar: {
    position: 'fixed',
    right: '0',
    minWidth: '350px',
    height: 'calc(100vh - 122px)', // minus header = 82 i margin block top=20 bottom=20 = "122px"
    marginLeft: '0 !important',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.2rem',
  },
  wrap: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main: {
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
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
});

export default Sidebar;
