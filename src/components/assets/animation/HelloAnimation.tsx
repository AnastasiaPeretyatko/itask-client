import Lottie from 'lottie-react';
import React from 'react';
import animationData from './hello.json';

const HelloAnimation = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ height: '150%' }}
    />
  );
};

export default HelloAnimation;