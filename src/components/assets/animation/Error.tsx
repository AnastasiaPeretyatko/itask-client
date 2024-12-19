import React from 'react'
import Lottie from 'lottie-react'
import animationData from './404.json'

const Error = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ maxHeight: 700, maxWidth: 700, width: '100%' }}
    />
  )
}

export default Error
