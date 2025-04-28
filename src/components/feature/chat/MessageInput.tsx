import { AddIcon } from '@chakra-ui/icons';
import { Card, IconButton, Input, useDisclosure } from '@chakra-ui/react';
import Picker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SendIcon, SmileIcon } from '@/components/icon';
import Popover from '@/components/ui/popover';
import { AppDispatch } from '@/store';
import { createMessageThunk } from '@/store/chat/chat.thunk';

const MessageInput = ({ room_id }: {room_id: string}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue((prevInput) => prevInput + emojiData.emoji);
  };

  const sendMessage = () => {
    dispatch(createMessageThunk({
      room_id,
      content: value,
    })).then(() => setValue(''));
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
        onChange={(e) => setValue(e.target.value)}
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