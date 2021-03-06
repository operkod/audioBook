import express, { Express } from "express";
import cors from 'cors';
import BookController from '../controllers/Book';
import UserController from '../controllers/User';
import ChatController from '../controllers/Chat';
import auth from '../middleware/auth';
import upload from '../middleware/upload'


const createRoutes = (app: Express) => {
  app.use(cors());
  app.use(express.json());

  const Book = new BookController();
  const User = new UserController();
  const Chat = new ChatController();

  app.get('/user/me', auth, User.getMe);
  app.post('/user/photo', auth, upload.single('image'), User.editPhoto);
  app.post('/user/signin', User.signin);
  app.post('/user/signup', User.signup);

  app.get('/book', Book.find);
  app.post('/book/add', auth, Book.add);
  app.get('/book/comment', Book.comment);
  app.post('/book/comment/add', auth, Book.addComment);
  app.post('/book/like', Book.addLike);

  app.get('/chat', Chat.comment);

};

export default createRoutes;