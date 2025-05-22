import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageItem from './MessageItem';
import { AppDispatch, RootState } from '@/store';
import { getMessageThunk } from '@/store/chat/chat.thunk';

const ChatWindow = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { messages, rooms } = useSelector((state: RootState) => state.rooms);

  const room = rooms.find((room) => room.id === router.query.roomId);

  useEffect(() => {
    if(router.query && router.query.roomId){
      dispatch(getMessageThunk({ id: router.query.roomId as string }));
    }
  }, [dispatch, router.query]);

  return (
    <VStack
      width={'full'}
      height={'full'}
      overflow={'hidden'}
      position={'relative'}
      flex={1}
      background={'background.main'}
    >
      <ChatHeader room={room}/>
      <VStack
        flex={1}
        height={'ful'}
        width={'full'}
        overflow={'hidden'}
      >
        <VStack
          width={'full'}
          overflowY={'auto'}
          flex={1}
          padding={2}
          // backgroundColor={'background.secondary'}
        >
          {
            messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
              />
            ))
          }
        </VStack>
        <MessageInput room_id={router.query.roomId as string}/>
      </VStack>
    </VStack>
  );
};

export default ChatWindow;