/* eslint-disable max-len */
import { Card, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { BsCheck2, BsCheck2All } from '@/components/icon';
import { RootState } from '@/store';
import { Message as MessageType } from '@/types/message.type';

const MessageItem = ({ message }: {message: MessageType}) => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <HStack
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      width={'full'}
      display={'flex'}
      justifyContent={'flex-end'}
      flexDirection={user?.id === message.author_id ? 'row' : 'row-reverse'}
      alignContent={'flex-end'}
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
            right: user?.id === message.author_id ? 'auto' : 0,
            left: user?.id !== message.author_id ? 0 : 'auto',
            background: 'inherit',
            zIndex: -1,
          }}
          height={'min-content'}
          padding={3}
          borderRadius={20}
          boxShadow={'none'}
          backgroundColor={user?.id === message.author_id ? 'blue.600' : 'background.secondary'}
          color={user?.id === message.author_id ? 'white' : 'text.secondary'}
        >
          <Text
            fontSize={'sm'}
          >{message.content}</Text>
        </Card>
        <Text
          color={'text.pale'}
          fontSize={'xs'}
          textAlign={'right'}
        >{moment(message.createdAt).format('HH:mm')}
          { user?.id === message.author_id ? true ? <BsCheck2All/> : <BsCheck2/> : null}
        </Text>
      </VStack>
      {/* <Avatar size={'sm'}/> */}
    </HStack>
  );
};

export default MessageItem;