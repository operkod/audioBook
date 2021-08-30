import React from 'react';
import { Spin } from 'antd';
import { createUseStyles } from 'react-jss';

type PropsTypes = {
  className?: string;
  style?: React.HTMLAttributes<HTMLDivElement>;
};

const Loader: React.FC<PropsTypes> = ({ className = '', style = {} }) => {
  const styles = useStyles();
  return (
    <div className={`${className} ${styles.loader}`} style={style}>
      <Spin size="large" />
    </div>
  );
};
const useStyles = createUseStyles({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

export default Loader;
