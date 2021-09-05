/*eslint-disable */
import './Profile.scss';
import React, { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, useCallback } from 'react';
import { Card, Image, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import useBooks from 'hooks/api/useBooks';
import useUserData from 'hooks/api/useUserData';
import CardBook from './CardBook';

const { Title } = Typography;

const Profile = () => {
  const { t } = useTranslation();
  const { booksData } = useBooks();
  const { userData, editUserAvatar, updateAvatar } = useUserData();
  const { name, avatar } = userData;

  const onChange = useCallback((event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    editUserAvatar({
      file: formData,
      successCallback: ({ avatar }: any) => {
        updateAvatar(avatar);
      },
    });
  }, []);

  return (
    <div className="profile">
      <div className="container">
        <Card>
          <div className="profile__header">
            <div className="profile__header-avatar">
              <Image width={200} src={avatar} />
              <Title level={2}>{t('profile.avatar.change')}:</Title>
              <input className="profile__header-field" type="file" placeholder="asdsad" onChange={onChange} />
            </div>
            <Title level={1} className="profile__header-title">
              <span style={{ fontSize: '20px' }}>{t('profile.name')}:</span>
              {name}
            </Title>
          </div>
        </Card>
        <Card>
          <Title level={3}>{t('profile.select')}</Title>
          <div className="profile__list">
            {booksData.books.map((book: any) => (
              <CardBook key={book._id} {...book} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
