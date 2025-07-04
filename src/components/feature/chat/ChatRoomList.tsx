import { AddIcon } from '@chakra-ui/icons';
import { Button, Input, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import ChatRoomItem from './ChatRoomItem';
import { useRoomStore } from './store.module';

const ChatRoomList = () => {
  const rooms = useRoomStore();

  useEffect(() => {
    rooms.fetchRooms();
  }, []);

  return (
    <VStack
      width={'25%'}
      minW={'350px'}
      height={'full'}
      gap={4}
    >
      <Input
        variant={'search'}
        size={'sm'}
        placeholder="Поиск..."
      />
      <Button
        width={'full'}
        gap={2}
        variant={'primary'}
        leftIcon={<AddIcon/>}
      >
        Создать чат
      </Button>

      <VStack
        width={'full'}
        height={'full'}
        //? Пришлось убрать так как при наведении список обрезается
        // overflowY={'auto'}
      >
        {
          rooms.rooms.map((room) => (
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