import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from 'components/Header';
import AudioPlayer from 'components/AudioPlayer';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import { getAudioId } from 'redux/selectors';
import { createUseStyles } from 'react-jss';
import useUserData from 'hooks/api/useUserData';
import { getToken } from 'helpers/token';

const MyLayout = ({ children }: any) => {
  const [appLaunch, setAppLaunch] = useState(true);
  const { getUserData } = useUserData();
  const isAudio = useSelector(getAudioId);
  const styles = useStyles();

  React.useEffect(() => {
    (async () => {
      if (getToken()) {
        await getUserData({ resultKey: 'userData' });
      }
      setAppLaunch(false);
    })();
  }, []);

  if (appLaunch) return <Loader />;
  return (
    <>
      <Header />
      <div className={styles.wrapper}>{children}</div>
      {!!isAudio && <AudioPlayer />}
      <Modal />
    </>
  );
};

export default MyLayout;

const useStyles = createUseStyles({
  wrapper: {
    // display: 'flex',
  },
});
