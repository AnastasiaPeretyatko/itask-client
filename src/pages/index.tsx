import CalendarInfo from '@/components/calendarInfo'
import AppLayout from '@/components/layout/AppLayout'
import { Container, Flex, HStack } from '@chakra-ui/react'
// import dynamic from 'next/dynamic'

// const HaveProblems = dynamic(
//   () => import('@/components/assets/animation/problems'),
//   { ssr: false }
// )

export default function Home() {
  return (
    <AppLayout>
      <HStack width={'100%'} height={'100%'} align={'start'}>
        <Flex flex={1} bg={'black'} h={'100%'}></Flex>
        <Container
          width={350}
          height={'full'}
          background={'white'}
          p={0}
          borderRadius={'24'}
        >
          <CalendarInfo />
        </Container>
      </HStack>
      {/* <HaveProblems /> */}
    </AppLayout>
  )
}
