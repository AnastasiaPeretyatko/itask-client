import { Avatar, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ChatBubble } from './message/ChatBubble';
import { useRoomStore } from './store.module';
import { Room } from '@/types/room';

const ChatRoomItem = ({ room }: {room: Room}) => {
  const router = useRouter();
  const rooms = useRoomStore();

  const isChatActive = router.query.roomId === room.id;

  const handleClickDialog = () => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, roomId: room.id },
      },
      undefined,
      { shallow: true },
    );
  };


  return (
    <Card
      as={motion.div}
      whileHover={{ scale: 1.05, boxShadow: 'lg' }}
      whileTap={{ scale: 0.95 }}
      zIndex={0}


      width={'full'}
      display={'flex'}
      flexDir={'row'}
      align={'center'}
      justify={'center'}
      gap={3}
      padding={4}
      backgroundColor={isChatActive ? 'primary.blue' : 'background.main'}
      color={isChatActive ? 'almostWhite' : 'almostBlack'}
      _hover={{ boxShadow: 'lg' }}
      borderRadius={0}
      cursor={'pointer'}
      onClick={handleClickDialog}
    >
      <Avatar
        size={'sm'}
      />
      <VStack
        width={'full'}
        height={'full'}
        flex={1}
        align={'start'}
        justify={'space-between'}
        overflow={'hidden'}
        gap={1}
      >
        <Heading
          size={'sm'}
          noOfLines={1}
          overflow={'hidden'}
          width={'full'}
          overflowX={'hidden'}
        >{room.title || room.users[0].fullName || room.users[0].email}</Heading>
        {
          rooms.typingUsers.includes(room.users[0]?.id || '') ? (
            <ChatBubble/>
          ) : room.messages.length ? (
            <Text
              fontSize={'sm'}
              color={isChatActive ? 'almostWhite' : 'text.pale'}
              noOfLines={1}
            >{room.messages[0].content}

            </Text>
          ) : null
        }
      </VStack>
      <HStack
        gap={0}
        height={'full'}
        align={'start'}
      >
        //TODO реализавать счетчик непрочитаных сообщений (на бэке в модели сообшения нет подходящего значения)
        <Text
          as={'span'}
          fontSize={'xs'}
          color={isChatActive ? 'almostWhite' : 'text.tertiary'}
          ml={2}
        >{moment(room.messages[0]?.createdAt).format('HH:mm')}</Text>
      </HStack>
    </Card>
  );
};

export default ChatRoomItem;