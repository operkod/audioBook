import React, { FC } from 'react';

type PropsTypes = {
  children?: any;
  className?: string;
};

const Block: FC<PropsTypes> = ({ children, className }) => (
  <div
    className={className}
    style={{
      backgroundColor: '#fff',
      borderRadius: '10px',
      margin: '20px',
      padding: '15px',
    }}
  >
    {children}
  </div>
);

export default Block;
