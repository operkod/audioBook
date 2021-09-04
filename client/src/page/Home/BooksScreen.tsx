/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, BackTop } from 'antd';
import { createUseStyles } from 'react-jss';
import { Article, Loader } from 'components';
import { BookType } from 'types';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import getParams from 'helpers/getParams';
import { StateType } from 'redux/reducer';
import { setParamsQueryBooks } from 'Actions';
import useBooks from 'hooks/api/useBooks';

type PropsTypes = {
  className?: string;
};

const BooksScreen: FC<PropsTypes> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const history = useHistory();
  const { page, search } = useSelector((state: StateType) => state.queryParams);
  const { getBooks, booksData, getBooksIsFetching } = useBooks();

  useEffect(() => {
    const { search } = history.location;
    const params = queryString.parse(search, {
      parseNumbers: true,
      parseBooleans: true,
    });
    dispatch(setParamsQueryBooks(params));
  }, [history.location, dispatch]);

  useEffect(() => {
    if (page !== 0 || search) {
      history.push({
        search: getParams({ page, search }),
      });
    }
  }, [page, search, history]);

  useEffect(() => {
    getBooks({ params: { page, search } });
  }, [page, search, getBooks]);

  const onChangePage = useCallback(
    (valuePage: number) => {
      dispatch(setParamsQueryBooks({ page: valuePage }));
    },
    [dispatch],
  );

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 82px)', // TODO: 82px height Header
        width: '100%',
      }}
    >
      {getBooksIsFetching ? (
        <Loader className={styles.loader} />
      ) : booksData.books?.length ? (
        <>
          {booksData.books?.map((book: BookType) => (
            // eslint-disable-next-line no-underscore-dangle
            <Article key={book._id} {...book} />
          ))}
          ;
          {booksData.total > 5 && (
            <Pagination
              style={{ textAlign: 'center', padding: '30px 0' }}
              current={page || 1}
              defaultCurrent={1}
              defaultPageSize={5}
              total={booksData.total}
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
