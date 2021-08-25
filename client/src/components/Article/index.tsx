import React from 'react';
import { useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import { Actions as ActionsComment } from 'redux/action/comments';
import { Actions as ActionsBook } from 'redux/action/books';
import { AuthorBlock } from 'components';
import { ButtonPlay } from 'components/button';
import { BookType } from 'types';

import commentIcon from 'assets/img/comment.svg';
import logo from 'assets/img/logo.svg';
import like from 'assets/img/like-up.svg';
import likeUp from 'assets/img/like.svg';

const Article: React.FC<BookType> = (props) => {
  const { _id, name, author, imgUrl, description, comments, likes } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const styles = useStyles();
  const handleClick = () => dispatch(ActionsComment.fetchComments(_id));

  const likeHandler = () => {
    dispatch(
      ActionsBook.requestAddLike({
        id: _id,
        successCallback: (data) => {
          console.log('DATA :', data);
        },
      }),
    );
  };

  const likeImage = (
    <img className={styles.likeImage} onClick={likeHandler} src={likes.status ? like : likeUp} alt="like" />
  );

  return (
    <div className={styles.article}>
      <div className={styles.articleLeft}>
        <div className={styles.articleImage}>
          <img src={imgUrl || logo} alt={name} />
        </div>
      </div>
      <div className={styles.description}>
        <div>
          <div className={styles.body}>
            <h2 className={styles.title}>{name}</h2>
            <Statistic valueStyle={{ fontSize: '20px', whiteSpace: 'nowrap' }} value={likes.count} prefix={likeImage} />
          </div>
          <p className={styles.text}>{description}</p>
        </div>
        <AuthorBlock name={author} />
        <div className={styles.footer}>
          <ButtonPlay bookId={_id} />
          <AuthorBlock
            className={styles.center}
            name={comments.length ? `${comments.length} ${t('article.comment.yes')}` : t('article.comment.no')}
            icon={commentIcon}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  article: {
    transition: 'background-color 0.3s ease',
    backgroundColor: '#fff',
    color: '#000',
    display: 'flex',
    padding: '20px 15px',
    margin: '20px 0',
    borderRadius: '10px',
    '@media (max-width: 500px)': {
      display: 'block',
    },
  },
  articleLeft: {
    width: ' 25%',
    overflow: 'hidden',
    '@media (max-width: 500px)': {
      width: '100%',
      margin: '0 auto 25px',
    },
    '@media (max-width: 600px)': {
      width: '150px',
    },
  },
  articleImage: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: ' 250px',
    '& img': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'auto',
      height: '100%',
    },
  },

  description: {
    paddingLeft: '10px',
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (max-width: 500px)': {
      width: '100%',
      marginBottom: '25px',
    },
  },
  center: {
    margin: ' 5px auto',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 500px)': {
      display: 'flex',
    },
    '@media (max-width: 600px)': {
      display: 'block',
    },
  },
  body: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  likeImage: {
    width: ' 26px',
    marginBottom: '10px',
    cursor: 'pointer',
  },
  title: {
    color: 'inherit',
    display: 'inline',
    fontSize: '26px',
    fontWeight: '700',
  },
  text: {
    fontSize: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default Article;
