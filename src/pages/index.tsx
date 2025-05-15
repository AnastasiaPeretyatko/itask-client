import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
// import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import CourseList from '@/components/feature/home/Widget/CourseList';
import TaskListWidget from '@/components/feature/home/Widget/TaskListWidget';
import AppLayout from '@/components/layout/AppLayout';
import CalendarWidget from '@/components/widget/CalendarWidget';
import { RootState } from '@/store';

// const HelloAnimation = dynamic(
//   () => import('@/components/assets/animation/HelloAnimation'),
//   { ssr: false },
// );

export default function Home() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <AppLayout>
      <HStack
        width={'100%'}
        height={'100%'}
        align={'start'}
      >
        <Flex
          flex={1}
          h={'100%'}
          width={'full'}
          flexDir={'column'}
          overflow={'hidden'}
          gap={4}
        >
          <HStack
            width={'full'}
            backgroundColor={'background.main'}
            padding={4}
            borderRadius={10}
            height={'20%'}
            // overflowY={'hidden'}
            justify={'space-between'}
          >
            <VStack
              align={'start'}
              justify={'space-between'}
              height={'full'}
            >
              <Heading
                size={'md'}
                color={'primary.purple'}
              > Добро пожаловать {user?.fullName}</Heading>
              <Text>На этой неделе вы выполнили 80% своих задач!
Продолжайте в том же духе и улучшайте свои результаты!</Text>
            </VStack>
            {/* <HelloAnimation/> */}
          </HStack>

          <HStack
            flex={1}
            overflow={'hidden'}
          >
            <TaskListWidget/>
          </HStack>
          <CourseList/>
        </Flex>
        <CalendarWidget />
      </HStack>
      {/* <HaveProblems /> */}
    </AppLayout>
  );
}
