import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageItem from './MessageItem';
import UploadFile from './UploadFile';
import { useMessageStore } from './message/store.module';
import { useRoomStore } from './store.module';
import SocketApi from '@/socket/api';
import { RootState } from '@/store';

const ChatWindow = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.user);

  const rooms = useRoomStore((state) => state.rooms);
  const roomId = useMessageStore((state) => state.roomId);
  const messages = useMessageStore((state) => state.messages);
  const fetchMessages = useMessageStore((state) => state.fetchMessages);
  const setRoomId = useMessageStore((state) => state.setRoomId);

  const room = rooms.find((room) => room.id === router.query.roomId);

  useEffect(() => {
    if (room && room.id) {
      setRoomId(room.id);
    }
  }, [room, setRoomId]);

  useEffect(() => {
    if (user && roomId) {
      SocketApi.connectedRoom(user?.fullName, roomId);
      fetchMessages(roomId);
    }
  }, [fetchMessages, roomId, user]);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrag, setIsDrag] = React.useState(false);

  const dragStarHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
  };

  const onDragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = [...e.dataTransfer.files];

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    console.log({ files });

    setIsDrag(false);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <VStack
      width={'full'}
      height={'full'}
      overflow={'hidden'}
      position={'relative'}
      background={'background.main'}
      onDragEnter={dragStarHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragStarHandler}
      onDrop={onDragHandler}
    >
      <ChatHeader room={room} />
      <VStack
        width={'full'}
        flex={1}
        overflowY={'auto'}
        spacing={2}
        paddingX={3}
        ref={containerRef}
      >
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
          />
        ))}
      </VStack>

      <MessageInput room_id={router.query.roomId as string} />
      <UploadFile
        isDrag={isDrag}
        dragStarHandler={dragStarHandler}
        dragLeaveHandler={dragLeaveHandler}
      />
    </VStack>
  );
};

export default ChatWindow;