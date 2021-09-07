import { Request, Response } from 'express';
import ChatModel from '../models/Chat';


class Chat {
  // constructor(io) {
  //   this.io = io

  // }
  comment = async (_: Request, res: Response) => {
    console.log("Chat")
    try {
      const messages = await ChatModel.find().sort({ datefield: -1 });

      res.status(201).json(messages)
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' })
    }
  }
}

export default Chat