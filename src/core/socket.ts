import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
// @ts-ignore
import config from '../../config'
import UserModel from '../models/User';
import ChatModel from '../models/Chat';


const io = (server: http.Server) => {
  const io = new Server(server);
  io.on('connection', socket => {
    socket.on('MESSAGE', async ({ token, message }) => {
      let user = null
      //@ts-ignore
      if (token) {
        const decoding = jwt.verify(token, 'Operkod');
        user = await UserModel.findById(
          //@ts-ignore
          { _id: decoding.userId },
          { id: 1, avatar: 1, fullname: 1 }
        );
      }

      const obj = {
        author: user?.fullname || 'User',
        avatar: user?.avatar,
        message,
      };
      const ChatMessage = new ChatModel(obj);
      await ChatMessage.save();
      io.emit('NEW_MESSAGE', obj);
    }),
      socket.on('disconnect', () => {
        console.log('user disconnect')
      });
  });

};

export default io;