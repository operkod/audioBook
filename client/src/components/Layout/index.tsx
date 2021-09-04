import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, AudioPlayer, Modal, Loader } from 'components';
import { getAudioId, getCommentsShow } from 'redux/selectors';
// import { WIDTH_SIDEBAR } from 'components/Sidebar';
import { createUseStyles } from 'react-jss';
import useUserData from 'hooks/api/useUserData';

// TODO:

const MyLayout = ({ children }: any) => {
  const [appLaunch, setAppLaunch] = useState(true);
  const { getUserData } = useUserData();

  const isAudio = useSelector(getAudioId);
  const showModal = useSelector(getCommentsShow);
  // const width = useSelector(getScreenWidth);
  const styles = useStyles();
  // const widthPercent = React.useMemo(() => ((width - WIDTH_SIDEBAR) * 100) / width, [width]);
  React.useEffect(() => {
    (async () => {
      await getUserData({ resultKey: 'userData' });
      setAppLaunch(false);
    })();
  }, []);

  if (appLaunch) return <Loader />;
  return (
    <>
      <Header />
      <div className={styles.wrapper}>{children}</div>
      {!!isAudio && <AudioPlayer />}
      {showModal && <Modal />}
    </>
  );
};

export default MyLayout;

const useStyles = createUseStyles({
  wrapper: {
    // display: 'flex',
  },
});
