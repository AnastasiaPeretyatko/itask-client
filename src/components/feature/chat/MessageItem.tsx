/* eslint-disable max-len */
import { Avatar, Card, HStack, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Message as MessageType } from '@/types/message.type';

const MessageItem = ({ message }: {message: MessageType}) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <HStack
      width={'full'}
      justify={'flex-end'}
      flexDirection={user?.id === message.author_id ? 'row' : 'row-reverse'}
      align={'flex-end'}
      _first={{ pt: '64px' }}
    >
      <VStack>
        <Card
          maxW={'350px'}
          position={'relative'}
          _before={{
            content: '""',
            width: 4,
            height: 4,
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: 'inherit',
            zIndex: 8,
          }}
          height={'min-content'}
          padding={3}
          borderRadius={10}
          backgroundColor={user?.id === message.author_id ? 'secondary.blue' : 'background.main'}
        >
          <Text fontSize={'sm'}>{message.content}</Text>
          <Text
            color={'text.pale'}
            fontSize={'xs'}
            textAlign={'right'}
          >{moment(message.createdAt).format('HH:mm')}</Text>
        </Card>
      </VStack>
      <Avatar size={'sm'}/>
    </HStack>
  );
};

export default MessageItem;