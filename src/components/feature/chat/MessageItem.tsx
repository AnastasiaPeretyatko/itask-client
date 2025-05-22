/* eslint-disable max-len */
import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
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
      <VStack align={'end'}>
        <Card
          maxW={'370px'}
          minW={'300px'}
          position={'relative'}
          _before={{
            content: '""',
            width: 5,
            height: 5,
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: 'inherit',
            zIndex: 8,
          }}
          height={'min-content'}
          padding={3}
          borderRadius={20}
          boxShadow={'none'}
          backgroundColor={user?.id === message.author_id ? 'blue.600' : 'background.main'}
          color={user?.id === message.author_id ? 'white' : 'text.secondary'}
        >
          <Text fontSize={'sm'}>{message.content}</Text>
        </Card>
        <Text
          color={'text.pale'}
          fontSize={'xs'}
          textAlign={'right'}
        >{moment(message.createdAt).format('HH:mm')}</Text>
      </VStack>
      {/* <Avatar size={'sm'}/> */}
    </HStack>
  );
};

export default MessageItem;