import { Avatar, Box, Button, HStack, Input, Text, useBoolean, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { createMessageThunk } from '@/store/chat/chat.thunk';
import { Message } from '@/types/message.type';

type Props = {
  message: Message
  paddingLeft?: boolean
}

const CommentItem = ({ message, paddingLeft }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [value, setValue] = React.useState('');
  const [isReply, setIsReply] = useBoolean(false);

  const handleReply = () => {
    if(!router.query.id) return;
    dispatch(createMessageThunk({ content: value, parent_id: message.id, task_id: router.query.id as string }))
      .then(() => setIsReply.off())
      .then(() => setValue(''));
  };

  return (
    <VStack
      width={'full'}
      gap={4}
      paddingLeft={paddingLeft ? 12 : 0}
      position={'relative'}
    >
      <HStack
        width={'full'}
        align={'start'}
      >
        <Avatar size={'sm'}/>
        <VStack
          gap={1}
          align={'start'}
          width={'full'}
          overflow={'hidden'}
        >
          <HStack>
            <Text fontWeight={600}>{message.author.fullName}</Text>
            <Text color={'text.pale'}>{moment(message.updatedAt).subtract('days').calendar()}</Text>
          </HStack>
          <Text
            fontSize={'md'}
            color={'text.secondary'}
            width={'full'}
            whiteSpace={'wrap'}
          >{message.content}</Text>
          {!message.parent_id ? (
            <Button
              variant={'iconButton'}
              onClick={setIsReply.on}
            >Ответить</Button>
          ) : null}
        </VStack>
      </HStack>
      {message.children?.length ? (
        <Box
          position={'absolute'}
          height={'calc(100% - 50px)'}
          width={'1.5px'}
          left={'15px'}
          top={'50px'}
          backgroundColor={'divider'}
        />
      ) : null}
      {
        message.children ? message.children.map((item) => (
          <CommentItem
            key={item.id}
            message={item}
            paddingLeft
          />)) : null
      }
      {isReply ? (
        <HStack
          width={'full'}
          overflow={'hidden'}
          paddingLeft={12}
        >
          <Avatar size={'md'}/>
          <Input
            size={'sm'}
            placeholder="Ответить..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleReply()}
          />
        </HStack>
      ) : null}
    </VStack>
  );
};

export default CommentItem;