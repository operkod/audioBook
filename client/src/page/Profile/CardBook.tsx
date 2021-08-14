import React from 'react';
import { AuthorBlock } from 'components';
import { ButtonPlay } from 'components/button';
import { BookType } from 'types';

const CardBook: React.FC<BookType> = ({ _id, imgUrl, name }) => (
  <div className="profile__list-card">
    <div className="img">
      <img src={imgUrl} alt="avatar" />
    </div>
    <div style={{ marginLeft: '20px' }}>
      <h3 className="title">{name}</h3>
      <AuthorBlock name={name} />
      <ButtonPlay bookId={_id} />
    </div>
  </div>
);

export default CardBook;
