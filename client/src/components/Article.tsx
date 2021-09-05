import React, { useState, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { Statistic } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthorBlock from 'components/AuthorBlock';
import { ButtonPlay } from 'components/button';
import { BookType } from 'types';
import Block from 'components/Block';
import useBooks from 'hooks/api/useBooks';
import commentIcon from 'assets/img/comment.svg';
import logoIcon from 'assets/img/logo.svg';
import likeIcon from 'assets/img/like-up.svg';
import likeUpIcon from 'assets/img/like.svg';
import { formatStringEllipsis } from 'helpers/format';
import useModal from 'hooks/useModal';

const Article: React.FC<BookType> = (props) => {
  const { _id, name, author, imgUrl, description, comments, likes } = props;
  const [like, setLike] = useState(likes);
  const { t } = useTranslation();
  const styles = useStyles();
  const { getBookLike, getBookComment } = useBooks();
  const { setModal } = useModal();

  const clickHandler = () => {
    setModal({ show: true, loader: true, id: _id });
    getBookComment({
      id: _id,
      successCallback: () => {
        setModal({ show: true, loader: false });
      },
      errorCallback: () => {
        setModal({ show: false, loader: false });
      },
    });
  };

  const likeHandler = useCallback(() => {
    getBookLike({
      id: _id,
      checked: !like,
      successCallback: (res: { count: number; status: boolean }) => {
        setLike(res);
      },
    });
  }, [like, getBookLike, _id]);

  const likeImage = (
    <img className={styles.likeImage} onClick={likeHandler} src={like.status ? likeIcon : likeUpIcon} alt="like" />
  );

  return (
    <Block className={styles.article}>
      <div className={styles.articleLeft}>
        <div className={styles.articleImage}>
          <img src={imgUrl || logoIcon} alt={name} />
        </div>
      </div>
      <div className={styles.description}>
        <div>
          <div className={styles.body}>
            <h2 className={styles.title}>{name}</h2>
            <Statistic
              valueStyle={{ fontSize: '1.2rem', whiteSpace: 'nowrap' }}
              value={like.count}
              prefix={likeImage}
            />
          </div>
          <p className={styles.text}>{formatStringEllipsis(description, 300)}</p>
        </div>
        <AuthorBlock name={author} />
        <div className={styles.footer}>
          <ButtonPlay bookId={_id} />
          <AuthorBlock
            className={styles.center}
            name={comments.length ? `${comments.length} ${t('article.comment.yes')}` : t('article.comment.no')}
            icon={commentIcon}
            onClick={clickHandler}
          />
        </div>
      </div>
    </Block>
  );
};

const useStyles = createUseStyles({
  article: {
    transition: 'background-color 0.3s ease',
    color: '#000',
    display: 'flex',
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
    fontSize: '2rem',
    fontWeight: '700',
  },
  text: {
    fontSize: '1.1rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default Article;
