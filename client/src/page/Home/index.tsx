/*eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, BackTop } from 'antd';
import { Article, Loader } from 'components';
import { Actions } from 'redux/action/books';
import { getBooks, getBooksIsLoader, getBooksPage, getSearchValue, getTotalBooks } from 'redux/selectors';
import { BookType } from 'types';
import { useHistory } from 'react-router-dom';
import routers from 'const/routers';
import queryString from 'query-string';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(getBooks);
  const total = useSelector(getTotalBooks);
  const searchValue = useSelector(getSearchValue);
  const isLoader = useSelector(getBooksIsLoader);
  const page = useSelector(getBooksPage);
  const history = useHistory();

  const onChangePage = (valuePage: number) => {
    dispatch(Actions.setPage(valuePage));
  };
  // React.useEffect(() => {
  //   const { search } = history.location;
  //   const { page, search: value } = queryString.parse(search, {
  //     parseNumbers: true,
  //     parseBooleans: true,
  //   });
  //   if (page) dispatch(Actions.setPage(Number(page)));
  //   if (value) dispatch(Actions.searchValue(String(value)));
  // }, [history.location, dispatch]);

  // React.useEffect(() => {
  //   const str = queryString.stringify({ page, search: searchValue }, { skipNull: true });
  //   history.push({
  //     hash: routers.getBase(),
  //     search: `?${str}`,
  //   });
  // }, [page, searchValue, history]);

  React.useEffect(() => {
    dispatch(Actions.requestBook({ page, search: searchValue }));
  }, [page, searchValue, dispatch]);

  return (
    <>
      <div>
        <div className="articles" style={{ height: isLoader ? '100vh' : '100%', marginTop: '102px' }}>
          {isLoader ? (
            <Loader />
          ) : books.length ? (
            books.map((book: BookType) => <Article key={book._id} {...book} />)
          ) : (
            <div
              style={{
                height: '100%',
                textAlign: 'center',
                fontSize: '30px',
                fontWeight: 'bold',
              }}
            >
              Нечего не наедено
            </div>
          )}
          {total > 5 && (
            <Pagination
              style={{ textAlign: 'center' }}
              current={page ? page : 1}
              defaultCurrent={1}
              defaultPageSize={5}
              total={total}
              onChange={onChangePage}
            />
          )}
        </div>
      </div>
      <BackTop />
    </>
  );
};

export default Home;
