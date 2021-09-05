import axios from 'axios';
import { getToken } from 'helpers/token';
import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const useSocketChat = () => {
  const [messages, setMessages] = useState([]);

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
      setMessages(data);
    })();
  }, []);

  return { messages, addMessage };
};

export default useSocketChat;
