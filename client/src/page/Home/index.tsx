import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, BackTop } from 'antd'
import { Article } from 'components'
import { Actions } from 'redux/action/books'
import { getBooks, getSearchValue, getTotalBooks } from 'redux/selectors'

const Home = () => {
	const books = useSelector(getBooks)
	const total = useSelector(getTotalBooks)
	const searchValue = useSelector(getSearchValue)
	const [page, setPage] = React.useState(0)
	const dispatch = useDispatch()

	const handlePageClick = (page: number) => {
		setPage(page)
		dispatch(Actions.requestBook({ page: page - 1, search: searchValue }))
	}
	React.useEffect(() => {
		dispatch(Actions.requestBook({ page: page, search: searchValue }))
	}, [page, searchValue, dispatch])

	return (
		<>
			<div className='container'>
				<div className='articles'>
					{books.length ? (
						books.map((book: any, index: number) => (
							<Article key={book._id} {...book} index={index} />
						))
					) : (
						<div
							style={{
								height: '100%',
								textAlign: 'center',
								fontSize: '30px',
								fontWeight: 'bold'
							}}>
							Нечего не наедено
						</div>
					)}
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
