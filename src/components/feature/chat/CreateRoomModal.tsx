import { Button, Heading, HStack, ModalBody, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { BodyItemProps } from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch } from '@/store';
import { createRoomThunk } from '@/store/chat/chat.thunk';

const CreateRoomModal = ({ id, onClose }: {id: string} & BodyItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const save = () => {
    dispatch(createRoomThunk({ userIds: [id] }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res);
        onClose?.();
      })
      .catch(showErrorMessage);
  };

  // useEffect(() => {
  //   // Подключаемся с ID пользователя
  //   SocketApi.createConnection(id);

  //   // Подписываемся на событие создания комнаты
  //   SocketApi.subscribeToRoomCreated((data) => {
  //     console.log('Новая комната создана:', data);
  //     // Можно показать уведомление пользователю
  //     alert(`Вас добавили в комнату "${data.roomId}"`);
  //   });

  //   return () => {
  //     SocketApi.unsubscribeFromRoomCreated();
  //   };
  // }, [id]);

  return (
    <ModalBody
      as={'form'}
      padding={6}
      gap={4}
    >
      <Heading size={'md'}>Создать комнату</Heading>
      <Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus </Text>
      <HStack
        width={'full'}
        justify={'end'}
      >
        <Button
          size={'sm'}
          onClick={save}
          variant={'primary'}
        >Создать</Button>
        <Button
          size={'sm'}
          variant={'close'}
          onClick={onClose}
        >Отмена</Button>
      </HStack>
    </ModalBody>
  );
};

export default CreateRoomModal;