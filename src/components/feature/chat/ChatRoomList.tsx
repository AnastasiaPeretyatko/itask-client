import { Avatar, HStack, Input, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatRoomItem from './ChatRoomItem';
import CreateRoomModal from './CreateRoomModal';
import Modal from '@/components/ui/modal';
import { AppDispatch, RootState } from '@/store';
import { getAllRoomThunk, getUserForRoomsThunk } from '@/store/chat/chat.thunk';

const ChatRoomList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, users } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(getUserForRoomsThunk());
    dispatch(getAllRoomThunk());
  }, [dispatch]);

  return (
    <VStack
      width={'20%'}
      minW={'350px'}
      height={'full'}
      overflow={'hidden'}
      gap={4}
    >
      <Input
        variant={'search'}
        size={'sm'}
        placeholder="Поиск..."
      />
      <HStack
        width={'full'}
        minHeight={'max-content'}
        overflowX={'auto'}
        overflowY={'hidden'}
        gap={1}
      >
        {
          users.map((user) => (
            <Modal
              key={user.id}
              size="md"
              title="Создать комнату"
              action={
                <Avatar
                  size={'md'}
                  name={user.email}
                  cursor={'pointer'}
                  _hover={{
                    _before: {
                      content: `"${user.email }"`,
                      fontSize: 'xs',
                      position: 'absolute',
                      bottom: -1,
                      right: -1,
                      background: 'black',
                      padding: 1,
                      borderRadius: 'full',
                      zIndex: 10,
                    },
                  }}
                />
              }
              renderBody={(props) => (<CreateRoomModal
                id={user.id}
                {...props}
              />)}
            />
          ))
        }
      </HStack>

      <VStack
        width={'full'}
        height={'full'}
        overflow={'auto'}
      >
        {
          rooms.map((room) => (
            <ChatRoomItem
              key={room.id}
              room={room}
            />
          ))
        }
      </VStack>
    </VStack>
  );
};

export default ChatRoomList;