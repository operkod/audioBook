import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, BackTop } from 'antd'
import { Header } from 'components'
import { Article } from 'containers'
import { StateType } from 'redux/reducer'
import { Actions } from 'redux/action/books'


const Home = () => {
  const books = useSelector(({ books }: StateType) => books.items)
  const total = useSelector(({ books }: StateType) => books.total)
  const searchValue = useSelector(({ books }: StateType) => books.searchValue)
  const [page, setPage] = React.useState(0)
  const dispatch = useDispatch()

  const onSearchBook = (value: string) => {
    setPage(1)
    dispatch(Actions.searchValue(value))
  }
  React.useEffect(() => {
    dispatch(Actions.requestBook({ search: searchValue }))
  }, [searchValue, dispatch])

  const handlePageClick = (page: number) => {
    setPage(page)
    dispatch(Actions.requestBook({ page: page - 1, search: searchValue }))
  }

  return (
    <>
      <Header onSearchBook={onSearchBook} value={searchValue} />
      <div className="container">
        <div className="articles">
          {
            books.map((book: any, index: number) => <Article key={book._id} {...book} index={index} />)}
          {total > 5 ? (
            <Pagination
              style={{ textAlign: 'center' }}
              current={page}
              defaultCurrent={1}
              defaultPageSize={5}
              total={total}
              onChange={handlePageClick}
            />
          ) : null}
        </div>
      </div>
      <BackTop />
    </>
  )
}
export default Home
