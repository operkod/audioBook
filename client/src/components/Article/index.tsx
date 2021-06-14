import './Article.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Actions as ActionsAudio } from 'redux/action/audioPlayer'
import { Actions as ActionsComments } from 'redux/action/comments'
import { AuthorBlock, ButtonPlay } from 'components'
import { openNotification } from 'helpers/openNotification'
import { getAuth } from 'redux/selectors'
import commentIcon from 'assets/img/comment.svg'
import { Statistic } from 'antd'

import logo from 'assets/img/logo.svg'
import like from 'assets/img/like-up.svg'
import likeUp from 'assets/img/like.svg'
import { StateType } from 'redux/reducer'

type mapStateToPropsTypes = {
  isAuth: boolean
}
type mapDispatchToPropsTypes = {
  isPlay: (v: boolean) => void
  fetchComments: (v: string) => void
}

type Props = mapStateToPropsTypes & mapDispatchToPropsTypes & OwnProps

type OwnProps = {
  _id: string
  name?: string
  author?: string
  imgUrl?: string
  description?: string
  audioId?: string
  comments: []
}

const Article: React.FC<Props> = (props) => {
  const {
    _id,
    name,
    author,
    imgUrl,
    description,
    comments,
    isAuth,
    fetchComments,
  } = props

  const [activeLike, setLike] = React.useState(false)
  const [countLike, setCountLike] = React.useState<number>(0)

  const handleClick = () => fetchComments(_id)

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
          <ButtonPlay bookId={_id} />
          <AuthorBlock
            className="center"
            name={!!comments.length ? `${comments.length} коментария` : 'нет коментариев'}
            icon={commentIcon}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: StateType): mapStateToPropsTypes => ({
  isAuth: getAuth(state),
})

const mapDispatchToProps: mapDispatchToPropsTypes = {
  fetchComments: ActionsComments.fetchComments,
  isPlay: ActionsAudio.isPlay,
}


export default connect<mapStateToPropsTypes, mapDispatchToPropsTypes, OwnProps, StateType>(mapStateToProps, mapDispatchToProps)(Article)

