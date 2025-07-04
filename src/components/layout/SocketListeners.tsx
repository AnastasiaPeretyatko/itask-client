import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMessageStore } from '../feature/chat/message/store.module';
import { useRoomStore } from '../feature/chat/store.module';
import { useNotifications } from '@/hooks/useNotifications';
import SocketApi from '@/socket/api';
import { RootState } from '@/store';

const SocketListeners = () => {
  const { showSuccessMessage } = useNotifications();
  const { user: currentUser } = useSelector((state: RootState) => state.user);

  const { rooms } = useSelector((state: RootState) => state.rooms);

  const router = useRouter();
  const setMessage = useMessageStore((state) => state.setMessage);
  const setTypingUsers = useRoomStore((state) => state.setTypingUsers);
  const removeTypingUser = useRoomStore((state) => state.removeTypingUser);

  useEffect(() => {
    if (!currentUser || !currentUser.id) return;

    SocketApi.createConnection(currentUser.id);

    SocketApi.subscribeToRoomCreated((data) => {
      showSuccessMessage(`Вас добавили в комнату "${data.roomId}"`);
    });

    SocketApi.newMessage(({ message }) => {
      setMessage(message);
      showSuccessMessage('Новое сообщение');
    });

    SocketApi.isOnlineUser((data) => {
      console.log('Online users:', data);
    });

    SocketApi.typingUsers((data) => {
      console.log({ data });

      if (data.typing === true) {

        setTypingUsers(data.userId);
      } else {
        removeTypingUser(data.userId[0]);
      }
    });


    return () => {
      SocketApi.unsubscribeFromRoomCreated();
      SocketApi.unsubscribeFromNewMessage();
      SocketApi.off('userTyping');
      SocketApi.off('status');
      SocketApi.off('typing');
    };
  }, [rooms, router.query.id, router.route, showSuccessMessage, currentUser, setMessage, setTypingUsers, removeTypingUser]);

  return null;
};

export default SocketListeners;

