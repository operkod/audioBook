/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, BackTop } from 'antd';
import { createUseStyles } from 'react-jss';
import { Article, Loader } from 'components';
import { Actions } from 'redux/action/books';
import { getBooks, getBooksIsLoader, getBooksParams } from 'redux/selectors';
import { BookType } from 'types';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import getParams from 'helpers/getParams';

type PropsTypes = {
  className?: string;
};

const BooksScreen: FC<PropsTypes> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const books = useSelector(getBooks);
  const { page, search, totalPage } = useSelector(getBooksParams);
  const isLoader = useSelector(getBooksIsLoader);
  const history = useHistory();

  useEffect(() => {
    const { search } = history.location;
    const params = queryString.parse(search, {
      parseNumbers: true,
      parseBooleans: true,
    });
    dispatch(Actions.setParams(params));
  }, [history.location, dispatch]);

  useEffect(() => {
    if (page !== 0 || search) {
      history.push({
        search: getParams({ page, search }),
      });
    }
  }, [page, search, history]);

  useEffect(() => {
    dispatch(Actions.requestBook());
  }, [page, search, dispatch]);

  const onChangePage = (valuePage: number) => {
    dispatch(Actions.setParams({ page: valuePage }));
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 82px)', // TODO: 82px height Header
        width: '100%',
      }}
    >
      {isLoader ? (
        <Loader className={styles.loader} />
      ) : books.length ? (
        <>
          {books.map((book: BookType) => (
            <Article key={book._id} {...book} />
          ))}
          ;
          {totalPage > 5 && (
            <Pagination
              style={{ textAlign: 'center', padding: '30px 0' }}
              current={page || 1}
              defaultCurrent={1}
              defaultPageSize={5}
              total={totalPage}
              onChange={onChangePage}
            />
          )}
          ;
        </>
      ) : (
        <div className={styles.error}>Нечего не наедено</div>
      )}
      <BackTop />
    </div>
  );
};

const useStyles = createUseStyles({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  error: {
    height: '100%',
    textAlign: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
  },
});

export default BooksScreen;
