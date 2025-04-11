import { Flex, HStack } from '@chakra-ui/react';
import AppLayout from '@/components/layout/AppLayout';
import CalendarWidget from '@/components/widget/CalendarWidget';
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
        </Flex>
        <CalendarWidget />
      </HStack>
      {/* <HaveProblems /> */}
    </AppLayout>
  );
}
