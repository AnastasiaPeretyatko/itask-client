import { HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import ButtonUI from '@/components/ui/ButtonUI';

const buttonVariant = ['auth', 'primary', 'day', 'iconButton', 'sidebar', 'filter' , 'secondary'];

const StylePage = () => {
  return (
    <VStack
      width={'full'}
      padding={3}
    >
      <HStack width={'full'}>
        {buttonVariant.map((el) => (<ButtonUI
          variant={el}
          width={'max-content'}
          tooltip={el}
        >{el}</ButtonUI>))}
      </HStack>
    </VStack>
  );
};

export default StylePage;