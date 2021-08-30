import React from 'react';
import { useSelector } from 'react-redux';
import { Header, AudioPlayer, Modal } from 'components';
import { getAudioId, getCommentsShow } from 'redux/selectors';
// import { WIDTH_SIDEBAR } from 'components/Sidebar';
import { createUseStyles } from 'react-jss';

// TODO:

const MyLayout = ({ children }: any) => {
  const isAudio = useSelector(getAudioId);
  const showModal = useSelector(getCommentsShow);
  // const width = useSelector(getScreenWidth);
  const styles = useStyles();
  // const widthPercent = React.useMemo(() => ((width - WIDTH_SIDEBAR) * 100) / width, [width]);

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
