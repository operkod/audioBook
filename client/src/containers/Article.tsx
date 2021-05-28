import React from 'react'
import { connect } from 'react-redux'
import { Actions as ActionsAudio } from 'redux/action/audioPlayer'
import { fetchComments } from 'redux/action/comments'
import { Article as ArticleBase } from 'components'
import { StateType } from 'redux/reducer'
import { BookType } from 'types'


type mapStateToPropsTypes = {
  isAuth: boolean
}
type mapDispatchToPropsTypes = {
  isPlay: (v: boolean) => void
  fetchComments: (v: string) => void
  setAudio: (v: string) => void
  setAudioBookId: (v: string) => void
}
type OwnProps = BookType

type Props = mapStateToPropsTypes & mapDispatchToPropsTypes & OwnProps


const Article: React.FC<Props> = (props) => {
  const {
    _id,
    isAuth,
    comments,
    name,
    author,
    imgUrl,
    description,
    fetchComments,
  } = props

  const visibleComment = (bookId: string) => {
    fetchComments(bookId)
  }

  return (
    <ArticleBase
      id={_id}
      name={name}
      author={author}
      imgUrl={imgUrl}
      isAuth={isAuth}
      description={description}
      commentsSize={comments.length}
      visibleComment={visibleComment}
    />
  )
}

const mapStateToProps = (state: StateType): mapStateToPropsTypes => ({
  isAuth: state.user.isAuth,
})

const mapDispatchToProps: mapDispatchToPropsTypes = {
  fetchComments,
  isPlay: ActionsAudio.isPlay,
  setAudio: ActionsAudio.setAudio,
  setAudioBookId: ActionsAudio.setAudioBookId
}

export default connect<mapStateToPropsTypes, mapDispatchToPropsTypes, OwnProps, StateType>(mapStateToProps, mapDispatchToProps)(Article)
