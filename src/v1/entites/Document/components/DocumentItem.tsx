import { Image, Link, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { DocumentType } from '../types/type';

type Props = {
  doc: DocumentType
}

const DocumentItem = ({ doc }: Props) => {
  const router = useRouter();

  return (
    <>
      <Image
        src={`/${doc.type}.png`}
        width={5}
        objectFit="cover"
      />
      <Link
        fontWeight={600}
        fontSize={'md'}
        flex={1}
        onClick={() => router.push(`/doc/${doc.id}`)}
      >
        {doc.title || 'Без названия'}
      </Link>
      <Text
        fontSize={'sm'}
        color={'text.pale'}
      >{ moment(doc.updatedAt).subtract('days').calendar() }</Text>
    </>
  );
};

export default DocumentItem;