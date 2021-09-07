/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, FC, useCallback } from 'react';
import { Pagination, BackTop } from 'antd';
import { createUseStyles } from 'react-jss';
import Article from 'components/Article';
import Loader from 'components/Loader';
import { BookType } from 'types';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import getParams from 'helpers/getParams';
import useBooks, { RequestBookParamsType } from 'hooks/api/useBooks';

type PropsTypes = {
  className?: string;
};

const BooksScreen: FC<PropsTypes> = ({ className = '' }) => {
  const styles = useStyles();
  const history = useHistory();
  const { getBooks, booksData, getBooksIsFetching, setRequestBookParams, requestBookParams } = useBooks();
  const { page, search } = requestBookParams;

  useEffect(() => {
    const searchValue = history.location.search;
    const parsString = queryString.parse(searchValue, {
      parseNumbers: true,
      parseBooleans: true,
    });
    // TODO:
    const params = { page, search };
    if (parsString.page) {
      params.page = parsString.page;
    } else if (parsString.search) {
      params.search = parsString.search;
    }
    if (params.page !== page || params.search !== search) {
      // eslint-disable-next-line no-debugger
      debugger;
      setRequestBookParams({ page: params.page, search: params.search });
    }
  }, [history.location.search]);

  useEffect(() => {
    if (page || search) {
      history.push({
        search: getParams({ page, search }),
      });
    }
  }, [history, page, search]);

  useEffect(() => {
    getBooks({ params: { ...requestBookParams } });
  }, [requestBookParams, getBooks]);

  const onChangePage = useCallback(
    (valuePage: number) => {
      setRequestBookParams({ page: valuePage, search });
    },
    [setRequestBookParams, search],
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
              current={requestBookParams?.page || 1}
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
