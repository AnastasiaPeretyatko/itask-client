import { Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: string;
  color?: string;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Empty = ({ children, color, fontSize = 'sm' }: Props) => {
  return (
    <Text
      color={color || 'text.pale'}
      fontSize={fontSize}
    >{children}</Text>
  );
};

export default Empty;