import React from 'react'
import { AuthorBlock, ButtonPlay } from 'components'

import './Article.scss'

import commentIcon from 'assets/img/comment.svg'

import { Statistic } from 'antd'

import logo from 'assets/img/logo.svg'
import like from 'assets/img/like-up.svg'
import likeUp from 'assets/img/like.svg'
import { openNotification } from 'helpers/openNotification'


type Props = {
  id: string
  name?: string
  author?: string
  imgUrl?: string
  description?: string
  audioId?: string
  commentsSize: number
  isAuth: boolean
  visibleComment: (arg: string) => void
}

const Article: React.FC<Props> = (props) => {
  const {
    id,
    name,
    author,
    imgUrl,
    description,
    commentsSize,
    isAuth,
    visibleComment,
  } = props

  const [activeLike, setLike] = React.useState(false)
  const [countLike, setCountLike] = React.useState<number>(0)
  const handleClick = () => visibleComment(id)

  const handleLike = () => {
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
    <div className="article">
      <div className="article-left">
        <div className="article-img">
          <img src={imgUrl || logo} alt={name} />
        </div>
      </div>
      <div className="article-description">
        <div className="article-description__body">
          <div className='body-wrap' >
            <h2 className="article-description__body-title">{name}</h2>
            <Statistic valueStyle={{ fontSize: '20px', whiteSpace: 'nowrap' }} value={countLike} prefix={
              <img className='article-description__body-like' onClick={handleLike} src={activeLike ? like : likeUp} alt="like" />
            }
            />
          </div>
          <p className="article-description__body-text">{description}</p>
        </div>
        <AuthorBlock name={author}
        />
        <div className="article-description__footer">
          <ButtonPlay bookId={id} />
          <AuthorBlock
            className="center"
            name={!!commentsSize ? `${commentsSize} коментария` : 'нет коментариев'}
            icon={commentIcon}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}


// const propsAreEqual = (prevProps: Props, nextProps: Props): boolean => {
//   return nextProps.audioId === nextProps.id && prevProps.isPlay !== nextProps.isPlay
// }

export default React.memo(Article)

