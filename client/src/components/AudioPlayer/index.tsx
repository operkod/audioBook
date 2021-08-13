import './AudioPlayer.scss';
import 'react-h5-audio-player/src/styles.scss';
import React from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from 'redux/action/audioPlayer';
import { getAudioSrc, getPlay } from 'redux/selectors';

const AudioPlayer = () => {
  const myPlayer = React.useRef<any>(null);
  const dispatch = useDispatch();
  const isPlay = useSelector(getPlay);
  const audioSrc = useSelector(getAudioSrc);

  React.useEffect(() => {
    if (isPlay) {
      myPlayer.current.audio.current.play();
    } else if (!isPlay) {
      myPlayer.current.audio.current.pause();
    }
  }, [isPlay]);

  const handleClick = ({ type }: any) => {
    if (type === 'play') {
      dispatch(Actions.isPlay(true));
    } else if (type === 'pause') {
      dispatch(Actions.isPlay(false));
    }
  };

  return (
    <div className="audio-player">
      <div className="container">
        <H5AudioPlayer
          autoPlay={false}
          ref={myPlayer}
          src={audioSrc}
          onPlay={handleClick}
          onPause={handleClick}
          autoPlayAfterSrcChange
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
