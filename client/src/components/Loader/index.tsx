import { Spin } from 'antd';
import React from 'react';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const Loader = () => (
  <div className="loader" style={style}>
    <Spin size="large" />
  </div>
);
export default Loader;
