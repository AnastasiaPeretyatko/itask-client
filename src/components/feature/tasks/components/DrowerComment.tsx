import { ChatIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure, IconButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentsBox from '../modals/components/CommentsBox';
import CommentItem from './CommentItem';
import Empty from '@/components/ui/Empty';
import { AppDispatch, RootState } from '@/store';
import { createMessageThunk, getMessageThunk } from '@/store/chat/chat.thunk';

type Props = {
  isDisabled?: boolean
};

const DrowerComment = ({ isDisabled = false }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { messages } = useSelector((state: RootState) => state.rooms);

  const onSendMessage = (content: string) => {
    if(router.query.id){
      dispatch(createMessageThunk({ task_id: router.query.id as string, content }));
    }
  };

  useEffect(() => {
    if(router.query.id){
      dispatch(getMessageThunk({ task_id: router.query.id as string }));
    }
  }, [dispatch, router.query.id]);

  return (
    <>
      <IconButton
        aria-label="comment"
        variant={'unstyled'}
        icon={<ChatIcon/>}
        onClick={onOpen}
        isDisabled={isDisabled}
      />
      <Drawer
        size={'sm'}
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Комментарии
          </DrawerHeader>

          <DrawerBody
            display={'flex'}
            flexDir={'column'}
            gap={6}
            maxH={'full'}
            overflow={'auto'}
          >
            {
              !messages.length
                ? <Empty>Нет комментариев...</Empty>
                : messages.map((message) => (
                  <CommentItem
                    key={message.id}
                    message={message}
                  />
                ))
            }
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <CommentsBox onSendMessage={onSendMessage}/>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrowerComment;