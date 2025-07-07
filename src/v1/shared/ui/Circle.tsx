import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = {
  size?: number
  color?: string
  top?: number
  right?: number
  left?: number
  bottom?: number
}

const Circle = ({ size = 10, color = 'secondary.purple', ...props }: Props) => {
  return (
    <Container
      width={size}
      height={size}
      variant={'circle'}
      background={color}
      {...props}
    />
  );
};

export default Circle;