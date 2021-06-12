import React from 'react'
import playIcon from 'assets/img/play.svg'
import stopIcon from 'assets/img/stop.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/action/audioPlayer'
import { getAudioId, getPlay } from 'redux/selectors'

const pathMp3 = require('assets/audio/as.mp3')

type Props = {
  bookId: string
}

const ButtonPlay: React.FC<Props> = ({ bookId }) => {
  const audioPlayerId = useSelector(getAudioId)
  const isPlay = useSelector(getPlay)
  const dispatch = useDispatch()

  const handleClick = () => {
    if (bookId === audioPlayerId) {
      dispatch(Actions.isPlay(!isPlay))
      return
    }
    // TODO
    dispatch(Actions.setAudioBookId(bookId))
    dispatch(Actions.setAudio(pathMp3.default))
    dispatch(Actions.isPlay(true))
  }

  return (
    <div onClick={handleClick} className="audio">
      {bookId === audioPlayerId && isPlay ? (
        <img src={stopIcon} alt="stop" />
      ) : (
        <img src={playIcon} alt="play" />
      )}
      <span>Воспроизвести</span>
    </div>
  )
}

export default ButtonPlay