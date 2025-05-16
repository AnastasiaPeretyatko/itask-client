import { Flex, HStack, Spinner, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar';
import Header from '../header';
import { AppDispatch } from '@/store';
import { settings } from '@/store/user/user.slice';
import 'moment/locale/ru';

const AppLayout = ({ children, loading }: { children: React.ReactNode, loading?: boolean }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState<boolean>(loading || true);

  moment.locale('ru');

  useEffect(() => {
    if (isLoading) {
      const user = localStorage.getItem('user');
      if(!user) {
        router.push('/auth');
        return;
      }
      dispatch(settings.setUser(JSON.parse(user!)));
      setIsLoading(false);
    }
  }, [dispatch, isLoading, router]);

  useEffect(() => {
    setIsLoading(loading || false);
  }, [loading]);

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
          overflowX="hidden"
          p={2}
          paddingLeft={6}
          bg={'background.secondary'}
        >
          {isLoading ? (
            <VStack
              width="100%"
              height="100%"
              align="center"
              justify="center"
            >
              <Spinner
                size={'xl'}
                thickness="4px"
              />
            </VStack>
          ) : children}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default AppLayout;
