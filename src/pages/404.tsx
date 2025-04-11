import { Flex, Heading, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';

const HaveProblems = dynamic(
  () => import('@/components/assets/animation/Error'),
  { ssr: false },
);

const ErrorPage = () => {
  return (
    <AppLayout>
      <Flex
        width={'100%'}
        align={'center'}
        justify={'center'}
        flexDir={'column'}
      >
        <HaveProblems />
        <Heading
          fontSize={'xl'}
          mb={4}
        >Ошибка</Heading>
        <Text color={'gray.500'}>К сожелению, запрашиваемая вами страница не найдена</Text>
      </Flex>
    </AppLayout>
  );
};

export default ErrorPage;
