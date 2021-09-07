import React from 'react';
import { createUseStyles } from 'react-jss';
import Sidebar from 'components/Sidebar';
import Modal from 'components/Modal';
import BooksScreen from './BooksScreen';

// TODO: убирать компонент Sidebar при ширине <1200

const Home = () => {
  const styles = useStyles();
  return (
    <div className={styles.home}>
      <BooksScreen className={styles.books} />
      <Sidebar className={styles.sidebar} />
      <Modal />
    </div>
  );
};

const useStyles = createUseStyles({
  home: {
    display: 'flex',
  },
  books: {
    paddingRight: '370px', // height sidebar
    '@media (max-width: 1199px)': {
      paddingRight: '0',
    },
  },
  sidebar: {
    '@media (max-width: 1199px)': {
      display: 'none',
    },
  },
});

export default Home;
