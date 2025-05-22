import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
// import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import CourseList from '@/components/feature/home/Widget/CourseList';
import TaskListWidget from '@/components/feature/home/Widget/TaskListWidget';
import AppLayout from '@/components/layout/AppLayout';
import CalendarWidget from '@/components/widget/CalendarWidget';
import { RootState } from '@/store';
import { UserRole } from '@/types/user.type';

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
            // height={'20%'}
            // overflowY={'hidden'}
            justify={'space-between'}
          >
            <VStack
              align={'start'}
              justify={'space-between'}
              height={'full'}
              gap={4}
              color={'text.secondary'}
            >
              <Heading
                size={'md'}
                color={'primary.purple'}
              > Добро пожаловать {user?.fullName}</Heading>
              {
                user?.role === UserRole.Professor ? (
                  <Text>
                    Мы искренне рады видеть вас снова в системе.<br/>
                    Ваше участие играет важную роль в образовательном процессе, и мы ценим ваш вклад в обучение и развитие студентов.<br/>
                    Благодаря вам учебный процесс становится более интересным, насыщенным и эффективным.<br/>
                    Если у вас возникнут вопросы или потребуется помощь — мы всегда готовы поддержать вас.<br/>
                    Хорошей и продуктивной работы!
                  </Text>
                ) : (
                  <Text>
                    На этой неделе вы выполнили 80% своих задач!
                    Продолжайте в том же духе и улучшайте свои результаты!
                  </Text>
                )
              }
            </VStack>
            {/* <HelloAnimation/> */}
          </HStack>

          {user?.role === UserRole.Student ? (
            <HStack
              flex={1}
              overflow={'hidden'}
            >
              <TaskListWidget/>
            </HStack>
          ) : null}
          <CourseList/>
        </Flex>
        <CalendarWidget />
      </HStack>
      {/* <HaveProblems /> */}
    </AppLayout>
  );
}
