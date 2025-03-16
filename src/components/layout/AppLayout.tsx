import { Flex, HStack, Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar';
import Header from '../header';
import { AppDispatch } from '@/store';
import { settings } from '@/store/user/user.slice';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useLayoutEffect(() => {
    if (isLoading) {
      const user = localStorage.getItem('user');
      if(!user) {
        router.push('/auth');
        return;
      }
      dispatch(settings.setUser(JSON.parse(user!)));
      setIsLoading(false);
    }
  }, [isLoading, router]);

  if (isLoading) {
    return (
      <VStack
        width="100%"
        height="100vh"
        align="center"
        justify="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="SECONDARY_BLUE"
          color="PRIMARY_BLUE"
          size="xl"
        />
      </VStack>
    );
  }

  return (
    <VStack
      w="full"
      height="100vh"
      gap={0}
      overflow={'hidden'}
    >
      <Header />
      <HStack
        width={'100%'}
        height={'100%'}
        overflow={'hidden'}
        gap={0}
      >
        <Sidebar/>
        <Flex
          as={'main'}
          w="100%"
          h="full"
          alignItems="start"
          justifyContent="start"
          flexDir="column"
          overflowY="auto"
          p={2}
          bg={'background.secondary'}
        >
          {children}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default AppLayout;
