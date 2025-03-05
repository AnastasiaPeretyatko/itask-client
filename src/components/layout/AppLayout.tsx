import { Flex, HStack, Spinner, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar';
import Header from '../header';
import { AppDispatch } from '@/store';
import { settings } from '@/store/user/user.slice';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isLoading) {
      const user = localStorage.getItem('user');
      dispatch(settings.setUser(JSON.parse(user!)));
      setIsLoading(false);
    }
  }, [isLoading]);

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
          bg={'gray.100'}
        >
          {children}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default AppLayout;
