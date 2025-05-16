import { Button, Heading, HStack, ModalContent, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch } from '@/store';
import { deleteDocumentThunk } from '@/store/documents/documents.thunk';

export type DeleteDocModalProps = {
  id: string;
  onClose: () => void;
};

const DeleteDocModal = ({ id, onClose }: DeleteDocModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const handleDeleteDoc = () => {
    dispatch(deleteDocumentThunk(id))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        if(router.query.id === id) router.push('/doc');
        onClose();
      })
      .catch(showErrorMessage);
  };

  return (
    <ModalContent
      padding={4}
      gap={4}
    >
      <Heading size={'md'}>Удалить документ?</Heading>
      <Text
        fontSize={'sm'}
        color={'text.pale'}
      >Вы действительно хотите удалить документ?</Text>
      <HStack
        width={'full'}
        justify={'end'}
      >
        <Button
          onClick={handleDeleteDoc}
          colorScheme={'red'}
        >Да</Button>
        <Button onClick={onClose}>Нет</Button>
      </HStack>
    </ModalContent>
  );
};

export default DeleteDocModal;