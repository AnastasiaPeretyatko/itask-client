import { Avatar, Button, Container, Link, Text, useDisclosure, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { DotIcon } from '@/components/icon';
import { useDocumentStore } from '@/v1/entites/Document/module/store';

const DocumentMetaTooltip = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const doc = useDocumentStore((state) => state.doc);

  return (
    <Container
      position={'relative'}
      onMouseLeave={onClose}
    >
      <Link
        fontSize={'sm'}
        color={'text.pale'}
        onMouseEnter={onOpen}
      >
        {doc?.creator.fullName} <DotIcon boxSize={1}/> {moment(doc?.updatedAt).fromNow()}
      </Link>

      {isOpen ? (
        <Container
          position={'absolute'}
          backgroundColor={'background.main'}
          padding={4}
          zIndex={10}
          borderRadius={10}
          display={'flex'}
          flexDir={'row'}
          gap={2}
          boxShadow={'xl'}
          minW={72}
        >

          <Avatar size={'sm'} />
          <VStack
            width={'full'}
            align={'start'}
            gap={0}
          >
            <Text>{doc?.creator.fullName}</Text>
            <Text
              fontSize={'xs'}
              color={'text.pale'}
              mb={2}
            >{doc?.creator.email}</Text>
            <Button
              size={'xs'}
              width={'full'}
              variant={'primary'}
              onClick={() => null}
            >Написать</Button>
          </VStack>
        </Container>
      ) : null}
    </Container>
  );
};

export default DocumentMetaTooltip;