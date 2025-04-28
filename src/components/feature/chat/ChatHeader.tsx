import { Avatar, Card, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Room } from '@/types/room';

const ChatHeader = ({ room }: {room?: Room}) => {
  return (
    <Card
      width="full"
      position="absolute"
      top={0}
      zIndex={9}
      backgroundColor="whiteAlpha.600"
      backdropFilter="blur(10px)"
      display="flex"
      flexDir="row"
      padding={3}
      gap={3}
      align="center"
    >
      <Avatar size={'sm'}/>
      <VStack
        align={'start'}
        gap={0}
      >
        <Heading size={'sm'}>{room?.title || room?.users[0].fullName}</Heading>
        <Text
          fontSize={'sm'}
          color={'text.pale'}
        >Online</Text>
      </VStack>
    </Card>
  );
};

export default ChatHeader;