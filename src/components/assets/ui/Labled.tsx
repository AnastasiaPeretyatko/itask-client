import { Container, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

type LabeledProps = {
  label: string
  children: React.ReactNode
  variantLabel?: string
  isModal?: boolean
} & FlexProps

const Labeled = ({ label, children, variantLabel, isModal = false, ...props }: LabeledProps) => {
  return (
    <Flex
      width={'full'}
      height={isModal ? '38px' : '100%'}
      {...props}
    >
      <Container
        as="label"
        variant={variantLabel}
        alignContent="center"
        padding={0}
        minW={isModal ? '160px' : 'unset'}
        fontSize={'sm'}
        color={'text.pale'}
      >
        {label}
      </Container>
      {children}
    </Flex>
  );
};

export default Labeled;