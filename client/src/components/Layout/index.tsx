import React from 'react';
import { useSelector } from 'react-redux';
import { Header, AudioPlayer, Modal } from 'components';
import { getAudioId, getCommentsShow, getScreenWidth } from 'redux/selectors';
import Sidebar, { WIDTH_SIDEBAR } from 'components/Sidebar';
import { createUseStyles } from 'react-jss';

const MyLayout = ({ children }: any) => {
  const isAudio = useSelector(getAudioId);
  const showModal = useSelector(getCommentsShow);
  const width = useSelector(getScreenWidth);
  const styles = useStyles();
  const widthPercent = React.useMemo(() => ((width - WIDTH_SIDEBAR) * 100) / width, [width]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div style={{ width: `${width > 1200 ? widthPercent : 100}%` }}>{children}</div>
        {!!isAudio && <AudioPlayer />}
        {showModal && <Modal />}
        <Sidebar />
      </div>
    </>
  );
};

export default MyLayout;

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
  },
});
