import './Article.scss'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/action/comments'
import { AuthorBlock, ButtonPlay } from 'components'
import { openNotification } from 'helpers/openNotification'
import { getAuth } from 'redux/selectors'
import { Statistic } from 'antd'
import { useTranslation } from 'react-i18next'

import commentIcon from 'assets/img/comment.svg'
import logo from 'assets/img/logo.svg'
import like from 'assets/img/like-up.svg'
import likeUp from 'assets/img/like.svg'
import styled, { ThemeProps } from 'styled-components'
import { ThemeType } from 'components/Layout'

type Props = {
	_id: string
	name?: string
	author?: string
	imgUrl?: string
	description?: string
	audioId?: string
	comments: []
}

const Article: React.FC<Props> = props => {
	const { _id, name, author, imgUrl, description, comments } = props
	const dispatch = useDispatch()
	const isAuth = useSelector(getAuth)
	const { t } = useTranslation()

	const [activeLike, setLike] = React.useState(false)
	const [countLike, setCountLike] = React.useState<number>(0)

	const handleClick = () => dispatch(Actions.fetchComments(_id))

	const handleLike = () => {
		// TODO реlезовать на серевере лайки и вынести все это в saga
		if (!isAuth) {
			return openNotification({
				type: 'warning',
				text: 'Зарегистрируйтесь, чтобы оставить лайк'
			})
		}
		setLike(!activeLike)
		if (activeLike) setCountLike(countLike - 1)
		else setCountLike(countLike + 1)
	}

	return (
		<ArticleStyle>
			<div className='article-left'>
				<div className='article-img'>
					<img src={imgUrl || logo} alt={name} />
				</div>
			</div>
			<div className='article-description'>
				<div className='article-description__body'>
					<div className='body-wrap'>
						<h2 className='article-description__body-title'>{name}</h2>
						<Statistic
							valueStyle={{ fontSize: '20px', whiteSpace: 'nowrap' }}
							value={countLike}
							prefix={
								<img
									className='article-description__body-like'
									onClick={handleLike}
									src={activeLike ? like : likeUp}
									alt='like'
								/>
							}
						/>
					</div>
					<p className='article-description__body-text'>{description}</p>
				</div>
				<AuthorBlock name={author} />
				<div className='article-description__footer'>
					<ButtonPlay bookId={_id} />
					<AuthorBlock
						className='center'
						name={
							!!comments.length
								? `${comments.length} ${t('article.comment.yes')}`
								: t('article.comment.no')
						}
						icon={commentIcon}
						onClick={handleClick}
					/>
				</div>
			</div>
		</ArticleStyle>
	)
}

export default Article

const ArticleStyle = styled.div`
	transition: background-color 0.3s ease;
	background-color: ${(props: ThemeProps<ThemeType>) =>
		props.theme.backgroundColor.primary};
	color: ${(props: ThemeProps<ThemeType>) => props.theme.color.primary};
	display: flex;
	padding: 20px 15px;
	margin: 20px 0;
	border-radius: 10px;
	@media (max-width: 500px) {
		display: block;
	}
`
