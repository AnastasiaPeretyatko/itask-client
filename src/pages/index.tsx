import { Flex, HStack } from '@chakra-ui/react';
import CalendarWidget from '@/components/CalendarWidget';
import Modal from '@/components/assets/ui/modal';
import ModalButton from '@/components/assets/ui/modal/ModalButton';
import AppLayout from '@/components/layout/AppLayout';
import AddTask from '@/feature/AddTask';
import { task } from '@/store/task/task.slice';
// import dynamic from 'next/dynamic'

// const HaveProblems = dynamic(
//   () => import('@/components/assets/animation/problems'),
//   { ssr: false }
// )

export default function Home() {
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
        >
          <Modal
            title="kek"
            action={<ModalButton
              title="Add Task"
              onClick={ () => task.add}
            />}
            children={<AddTask/>}
          />
        </Flex>
        <CalendarWidget />
      </HStack>
      {/* <HaveProblems /> */}
    </AppLayout>
  );
}
