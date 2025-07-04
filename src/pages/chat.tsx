import { Heading, HStack, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChatRoomList from '@/components/feature/chat/ChatRoomList';
import ChatWindow from '@/components/feature/chat/ChatWindow';
import UserInfoPanel from '@/components/feature/chat/UserInfoPanel';
import AppLayout from '@/components/layout/AppLayout';

const ChatPage = () => {
  const [isLargerThan1000] = useMediaQuery('(min-width: 1000px)');
  const [isLargerThan700] = useMediaQuery('(min-width: 900px)');

  const [roomId, setRoomId] = useState('');

  const router = useRouter();

  useEffect(() => {
    if(router.query && router.query.roomId){
      setRoomId(router.query.roomId as string);
    }
  }, [router.query]);

  return (
    <AppLayout>
      <Heading
        size={'md'}
        mb={2}
      >Чат</Heading>
      <HStack
        width={'full'}
        height={'full'}
        overflowY={'hidden'}
        align={'start'}
        padding={4}
        borderRadius={10}
      >
        {/* TODO сделать адапти, чтобы выглядело как в макете */}
        {!router.query.roomId || isLargerThan700 ? <ChatRoomList/> : null}
        {roomId ? <ChatWindow/> : <p>Выберите кому хотите написать сообщение</p>}
        {router.query.roomId && isLargerThan1000 ? <UserInfoPanel/> : null }
      </HStack>
    </AppLayout>
  );
};

export default ChatPage;