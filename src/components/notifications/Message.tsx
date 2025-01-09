import {
  Avatar,
  AvatarBadge,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

const Message = () => {
  return (
    <HStack
      borderBottom={'1px solid'}
      borderColor={'blackAlpha.200'}
      py={4}
      gap={4}
    >
      <Avatar height={'40px'} width={'40px'}>
        <AvatarBadge boxSize={4} bg="green.500" />
      </Avatar>
      <VStack align={'start'} gap={0}>
        <Heading size={'sm'}>Вася Пупкин</Heading>
        <Text fontSize={'sm'} color={'blackAlpha.500'} fontWeight={600}>
          2h ago &bull; left a comment under the work
        </Text>
      </VStack>
    </HStack>
  )
}

export default Message
