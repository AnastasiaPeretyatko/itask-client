import Lottie from 'lottie-react'
import animationData from './problems.v1.json'
import { Flex, Heading, Text } from '@chakra-ui/react'

const HaveProblems = () => {
  return (
    <Flex width={'100%'} align={'center'} justify={'center'} flexDir={'column'}>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ maxHeight: 600, maxWidth: 800, width: '100%' }}
      />
      <Heading fontSize={'xl'} mb={4}>Что-то пошло не так</Heading>
      <Text color={'gray.500'}>Мы уже исправляем это!</Text>
    </Flex>
  )
}

export default HaveProblems
