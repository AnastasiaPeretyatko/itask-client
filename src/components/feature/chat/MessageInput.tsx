import { AddIcon } from '@chakra-ui/icons';
import { Card, IconButton, Input, useDisclosure } from '@chakra-ui/react';
import Picker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMessageStore } from './message/store.module';
import { SendIcon, SmileIcon } from '@/components/icon';
import Popover from '@/components/ui/popover';
import SocketApi from '@/socket/api';
import { RootState } from '@/store';
import { Message } from '@/types/message.type';

const MessageInput = ({ room_id }: {room_id: string}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');
  const { user: currentUser } = useSelector((state: RootState) => state.user);
  const [isTyping, setTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setMessage = useMessageStore((state) => state.setMessage);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prevInput) => prevInput + emojiData.emoji);
  };

  const sendMessage = async () => {
    const message = {
      room_id,
      author_id: currentUser?.id,
      content: value,
    } as Message;
    SocketApi.createMessage(message);
    setMessage(message);
    setValue('');
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const isCurrentlyTyping = newValue.length > 0;

    // Если пользователь начал печатать и мы еще не отправляли "typing: true"
    if (isCurrentlyTyping && !isTyping) {
      setTyping(true);
      SocketApi.onTyping({
        roomId: room_id,
        typing: true,
      });
    }

    // Всегда сбрасываем таймер, если пользователь продолжает печатать
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Ставим новый таймер на отправку "typing: false"
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      SocketApi.onTyping({
        roomId: room_id,
        typing: false,
      });
    }, 1000);
  };

  return (
    <Card
      width={'full'}
      display={'flex'}
      flexDir={'row'}
      padding={2}
      align={'center'}
    >
      <IconButton
        size={'sm'}
        isRound
        variant={'unstyled'}
        aria-label="add file"
        color={'primary.purple'}
        icon={<AddIcon/>}
      />
      <Input
        // variant={'primary'}
        borderRadius={'md'}
        borderColor={'divider'}
        value={value}
        onChange={handleTyping}
        size={'sm'}
        placeholder="Введите сообщение..."
        onKeyDown={(e) => {
          if(e.key === 'Enter') sendMessage();
        }}
      />
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="top-end"
        maxHeight={'full'}
        disclosureContent={<IconButton
          variant={'unstyled'}
          aria-label="smile"
          color={'text.pale'}
          icon={<SmileIcon boxSize={5}/>}
          onClick={onOpen}
        />}
      >
        <Picker
          onEmojiClick={onEmojiClick}
          emojiStyle={EmojiStyle.APPLE}
        />
      </Popover>
      <IconButton
        size={'sm'}
        aria-label="send"
        backgroundColor={'primary.purple'}
        color={'white'}
        icon={<SendIcon/>}
        onClick={sendMessage}
        isDisabled={!value.trim()}
      />
    </Card>
  );
};

export default MessageInput;