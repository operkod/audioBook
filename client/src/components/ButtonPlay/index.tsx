import React from 'react'

import playIcon from 'assets/img/play.svg'
import stopIcon from 'assets/img/stop.svg'
import { StateType } from 'redux/reducer'
import { useDispatch, useSelector } from 'react-redux'

import { Actions } from 'redux/action/audioPlayer'

const pathMp3 = require('assets/audio/as.mp3')

type Props = {
  bookId: string
}

const ButtonPlay: React.FC<Props> = ({ bookId }) => {
  const audioPlayerId = useSelector((state: StateType) => state.audio.id)
  const isPlay = useSelector((state: StateType) => state.audio.isPlay)
  const dispatch = useDispatch()

  const handleClick = () => {
    if (bookId === audioPlayerId) {
      dispatch(Actions.isPlay(!isPlay))
      return
    }
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