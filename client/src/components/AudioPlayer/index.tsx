import React from 'react'
import H5AudioPlayer from 'react-h5-audio-player'
import { connect } from 'react-redux'
import { Actions } from 'redux/action/audioPlayer'
import { StateType } from 'redux/reducer'

import 'react-h5-audio-player/src/styles.scss'
import './AudioPlayer.scss'

type mapStateToPropsTypes = {
  isPlay: boolean
  audioSrc: string
}
type mapDispatchToProps = {
  isAudioPlay: (v: boolean) => void
}
type Props = mapStateToPropsTypes & mapDispatchToProps


const AudioPlayer: React.FC<Props> = ({ isPlay, audioSrc, isAudioPlay }) => {
  const myPlayer = React.useRef<any>()
  const onPlay = () => isAudioPlay(true)
  const onPause = () => isAudioPlay(false)

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
          onPlay={onPlay}
          onPause={onPause}
          autoPlayAfterSrcChange={true}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: StateType): mapStateToPropsTypes => ({
  isPlay: state.audio.isPlay,
  audioSrc: state.audio.item
})
export default connect<mapStateToPropsTypes, mapDispatchToProps, any, StateType>(mapStateToProps, { isAudioPlay: Actions.isPlay })(AudioPlayer)
