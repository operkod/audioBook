import axios from 'api';
import { getToken } from 'helpers/token';
import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const useSocketChat = () => {
  const [messages, setMessages] = useState([
    {
      id: Math.random(),
      author: 'Saha',
      avatar: '',
      message: 'hello brat',
      date: new Date(),
    },
  ]);

  const addMessage = useCallback((message) => {
    const obj = {
      token: getToken(),
      message,
    };

    socket.emit('MESSAGE', obj);
  }, []);
  useEffect(() => {
    socket.on('NEW_MESSAGE', (msg) => {
      setMessages((prev) => prev.concat(msg));
    });
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/book/chat');
      console.log('DATA AXIOS :', data);
    })();
  }, []);

  return { messages, addMessage };
};

export default useSocketChat;
