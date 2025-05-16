import { Card, CloseButton, Heading, Image, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { DocumentType } from '@/types/document.type';

type Props = {
  doc: DocumentType
}

const DocumentCard = ({ doc }: Props) => {
  const router = useRouter();

  return (
    <Card
      flexDir={'row'}
      gap={3}
      padding={2}
      width={80}
      height={'full'}
      _hover={{
        cursor: 'pointer',
        background: 'button.hover',
      }}
      onClick={() => router.push(`/doc/${doc.id}`)}
    >
      <Image
        src={`/${doc.type}.png`}
        width={10}
        objectFit="cover"
      />
      <VStack align={'start'}>
        <Heading size={'sm'}>{doc.title || 'Без названия'}</Heading>
        <Text
          fontSize={'xs'}
          color={'text.pale'}
        >Последние изменения:{' '}
          <Text as={'span'}>
            {moment(doc.updatedAt).subtract('days').calendar()}
          </Text>
        </Text>
      </VStack>
      <CloseButton
        position={'absolute'}
        top={0}
        right={0}
        size={'sm'}
        color={'text.pale'}
        _hover={{
          color: 'black',
          background: 'unset',
        }}
      />
    </Card>
  );
};

export default DocumentCard;