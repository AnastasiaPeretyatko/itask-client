import { Container, HStack } from '@chakra-ui/react';
import React from 'react';

type Props = {
  title: string
  children: React.ReactNode
}

const WrapperProperty = ({ title, children }: Props) => {
  return (
    <HStack
      width={'full'}
      gap={2}
      height={'34px'}
    >
      <Container variant={'property_title'}>{title}</Container>
      {children}
    </HStack>
  );
};

export default WrapperProperty;