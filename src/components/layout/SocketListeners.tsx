// components/SocketListeners.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotifications } from '@/hooks/useNotifications';
import SocketApi from '@/socket/api';
import { AppDispatch, RootState } from '@/store';
import { addMessage } from '@/store/chat/chat.slice';

const SocketListeners = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showSuccessMessage } = useNotifications();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.id) return;

    SocketApi.createConnection(user.id);

    SocketApi.subscribeToRoomCreated((data) => {
      showSuccessMessage(`Вас добавили в комнату "${data.roomId}"`);
    });

    SocketApi.newMessage((data) => {
      dispatch(addMessage(data));
      showSuccessMessage('Новое сообщение');
    });

    return () => {
      SocketApi.unsubscribeFromRoomCreated();
      SocketApi.unsubscribeFromNewMessage();
    };
  }, [user]);

  return null;
};

export default SocketListeners;
