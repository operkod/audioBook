import { notification } from 'antd';

type Types = {
  text: string;
  type?: 'info' | 'error' | 'warning' | 'success';
  title?: string;
  duration?: number;
};
export const openNotification = ({ text, type = 'info', title, duration = 3 }: Types) =>
  notification[type]({
    message: title,
    description: text,
    duration,
  });
