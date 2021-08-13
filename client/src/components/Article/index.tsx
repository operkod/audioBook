import './Article.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Actions as ActionsComment } from 'redux/action/comments';
import { Actions as ActionsBook } from 'redux/action/books';
import { AuthorBlock, ButtonPlay } from 'components';
import { Statistic } from 'antd';
import { useTranslation } from 'react-i18next';

import commentIcon from 'assets/img/comment.svg';
import logo from 'assets/img/logo.svg';
import like from 'assets/img/like-up.svg';
import likeUp from 'assets/img/like.svg';
import styled, { ThemeProps } from 'styled-components';
import { ThemeType } from 'components/Layout';
import { BookType } from 'types';

const Article: React.FC<BookType> = (props) => {
  const { _id, name, author, imgUrl, description, comments, likes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => dispatch(ActionsComment.fetchComments(_id));

  const handleLike = () => {
    dispatch(ActionsBook.requestAddLike(_id));
  };

  const statisticImage = (
    <img
      className="article-description__body-like"
      onClick={handleLike}
      src={likes.status ? like : likeUp}
      alt="like"
    />
  );

  return (
    <ArticleStyle>
      <div className="article-left">
        <div className="article-img">
          <img src={imgUrl || logo} alt={name} />
        </div>
      </div>
      <div className="article-description">
        <div className="article-description__body">
          <div className="body-wrap">
            <h2 className="article-description__body-title">{name}</h2>
            <Statistic
              valueStyle={{ fontSize: '20px', whiteSpace: 'nowrap' }}
              value={likes.count}
              prefix={statisticImage}
            />
          </div>
          <p className="article-description__body-text">{description}</p>
        </div>
        <AuthorBlock name={author} />
        <div className="article-description__footer">
          <ButtonPlay bookId={_id} />
          <AuthorBlock
            className="center"
            name={comments.length ? `${comments.length} ${t('article.comment.yes')}` : t('article.comment.no')}
            icon={commentIcon}
            onClick={handleClick}
          />
        </div>
      </div>
    </ArticleStyle>
  );
};

export default Article;

const ArticleStyle = styled.div`
  transition: background-color 0.3s ease;
  background-color: ${(props: ThemeProps<ThemeType>) => props.theme.backgroundColor.primary};
  color: ${(props: ThemeProps<ThemeType>) => props.theme.color.primary};
  display: flex;
  padding: 20px 15px;
  margin: 20px 0;
  border-radius: 10px;
  @media (max-width: 500px) {
    display: block;
  }
`;
