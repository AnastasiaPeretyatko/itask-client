import { Avatar, Card, Heading, Text, VStack } from '@chakra-ui/react';
import MenuMessage from './MenuMessage';
import { ChatBubble } from './message/ChatBubble';
import { useRoomStore } from './store.module';
import { Room } from '@/types/room';

const ChatHeader = ({ room }: {room?: Room}) => {
  const roomStore = useRoomStore();

  return (
    <Card
      width="full"
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
        height={'full'}
        align={'start'}
        flex={1}
        gap={0}
        justifyContent={'space-between'}
      >
        <Heading
          size={'sm'}
          noOfLines={1}
        >{room?.title || room?.users[0].fullName || room?.users[0].email}</Heading>
        { roomStore.typingUsers.includes(room?.users[0].id || '') ? <ChatBubble/> : null }
        <Text
          fontSize={'sm'}
          color={'text.pale'}
        >Offline</Text>
      </VStack>
      <MenuMessage/>
    </Card>
  );
};

export default ChatHeader;