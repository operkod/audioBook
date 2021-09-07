


import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User';

type RequestBodySigninType = {
  email: string;
  password: string;
  fullname: string;
};

class User {
  getMe = async (req: Request, res: Response) => {
    try {
      // @ts-ignore;
      const userId = req.user.userId;
      const userProfile = await UserModel.findById(
        { _id: userId },
        { id: 1, avatar: 1, fullname: 1 }
      );
      res.json({ user: userProfile });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' });
    }
  };

  signup = async (req: Request<RequestBodySigninType>, res: Response) => {
    try {
      const { email, password, fullname } = req.body;
      const candidate = await UserModel.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой пользоватьль уже сущеествуйет' });
      };
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({ email, password: hashedPassword, fullname });
      await user.save();

      const jwtToken = jwt.sign({ userId: user.id }, "Operkod", {
        expiresIn: '12h'
      });
      res.json({ jwtToken });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' });
    };
  };

  signin = async (req: Request<{ email: string; password: string }>, res: Response) => {
    console.log(req.body)
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      };
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверные данные' });
      };
      const jwtToken = jwt.sign({ userId: user.id }, 'Operkod', {
        expiresIn: '12h'
      });
      res.json({ jwtToken });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' });
    };
  };

  editPhoto = async (req: Request, res: Response) => {
    try {
      // @ts-ignore;
      const imageUrl = req.file.path;
      // @ts-ignore;
      const userId = req.user.userId;
      await UserModel.findOneAndUpdate({ _id: userId }, { $set: { avatar: imageUrl } });
      // @ts-ignore;
      const { avatar } = await UserModel.findById({ _id: userId }, { avatar: 1 });
      res.json({ avatar });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так попробуйте сново' });
    };
  };

};

export default User;
