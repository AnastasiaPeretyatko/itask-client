import { Button, Heading, HStack, Input, InputGroup, InputLeftElement, ModalCloseButton, ModalContent, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LinkIcon } from '../icon';
import { EmbedDescription } from '.';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch } from '@/store';
import { createDocumentThunk } from '@/store/documents/documents.thunk';

type Props = {
  onClose: () => void
  embed: EmbedDescription
};

const AddEmbedSlide = ({ embed, onClose }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const [path, setPath] = React.useState('');

  const handleCreateDocument = () => {
    dispatch(createDocumentThunk({ title: '', type: embed.type, path }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        router.push(`/doc/${res.data.id}`);
      })
      .catch(showErrorMessage);
  };

  return (
    <ModalContent
      position={'relative'}
      padding={5}
      gap={4}
    >
      <ModalCloseButton
        position={'absolute'}
        top={4}
        right={4}
        boxSize={4}
        color={'text.pale'}
      />
      <Heading size={'md'}>Добавить ссылку</Heading>
      <Text
        fontSize={'sm'}
        color={'text.pale'}
      >Добавьте ссылку для дальнейшего использования сторонних сервисов</Text>
      <HStack>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            height={'100%'}
            width={'min-content'}
            padding={2}
            color={'text.pale'}
          >
            <LinkIcon/>
          </InputLeftElement>
          <Input
            size={'sm'}
            placeholder={'Введите ссылку...'}
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
        </InputGroup>
        <Button
          size={'sm'}
          width={'min-content'}
          variant={'primary'}
          onClick={handleCreateDocument}
        >Добавить</Button>
      </HStack>
    </ModalContent>
  );
};

export default AddEmbedSlide;