import './AudioPlayer.scss'
import 'react-h5-audio-player/src/styles.scss'
import React from 'react'
import H5AudioPlayer from 'react-h5-audio-player'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/action/audioPlayer'
import { getAudioId, getPlay } from 'redux/selectors'

const AudioPlayer = () => {
  const myPlayer = React.useRef<any>(null)
  const dispatch = useDispatch()
  const isPlay = useSelector(getPlay)
  const audioSrc = useSelector(getAudioId)

  React.useEffect(() => {
    if (isPlay) {
      return myPlayer.current.audio.current.play()
    } else if (!isPlay) {
      return myPlayer.current.audio.current.pause()
    }
  }, [isPlay])

  return (
    <div className="audio-player">
      <div className="container">
        <H5AudioPlayer
          autoPlay={true}
          ref={myPlayer}
          src={audioSrc}
          onPlay={() => dispatch(Actions.isPlay(false))}
          onPause={() => dispatch(Actions.isPlay(true))}
          autoPlayAfterSrcChange={true}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
