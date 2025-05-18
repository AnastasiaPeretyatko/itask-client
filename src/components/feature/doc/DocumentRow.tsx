import { Badge, Heading, HStack, Image, Text } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { deleteDocModal } from '@/actions/definitions/documents';
import embeds from '@/components/Embeds';
import { BsFileEarmarkText } from '@/components/icon';
import ActionMenu from '@/components/ui/Menu/ActionMenu';
import { DocumentType } from '@/types/document.type';

type DocumentRowProps = {
  doc: DocumentType
};

const DocumentRow = ({ doc }: DocumentRowProps) => {
  const router = useRouter();
  const isNewDoc = doc?.createdAt && moment().diff(moment(doc.createdAt), 'hours') < 1;

  const listActions = useMemo(() => [
    deleteDocModal(doc.id),
  ], [doc]);

  const Component = () => {
    const embed = embeds.find((item) => item.type === doc.type);
    let EmbedIcon: React.FC<unknown>;
    if(embed){
      EmbedIcon = embed.icon;
      return <EmbedIcon/>;
    }
    return (
      <Image
        src="/code.png"
        width={5}
      />
    );
  };

  return (
    <HStack
      width={'full'}
      justify={'space-between'}
      padding={2}
      _hover={{ backgroundColor: 'button.hover' }}
      borderRadius={'md'}
      cursor={'pointer'}
      _notLast={{
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}

    >
      <HStack width={'full'}>
        {doc.type !== 'document' ? <Component/> : <BsFileEarmarkText color={'text.pale'}/>}

        <Heading
          size={'sm'}
          fontWeight={500}
          _hover={{
            color: 'primary.purple',
          }}
          onClick={() => router.push(`/doc/${doc.id}`)}
        >
          {doc.title || 'Новый документ'}
          {isNewDoc ? (
            <Badge
              colorScheme="green"
              ml={2}
              padding={1}
              fontSize={'10px'}
            >Новый</Badge>
          ) : null}
          <Badge
            variant={doc.type}
            ml={2}
            padding={1}
            fontSize={'10px'}
          >{doc.type}</Badge>
        </Heading>
      </HStack>
      <Text
        fontSize={'sm'}
        whiteSpace={'nowrap'}
        color={'text.pale'}
      >{moment(doc.updatedAt).subtract('days').calendar()}</Text>
      <ActionMenu
        actions={() => listActions}
        data={doc}
      />
    </HStack>
  );
};

export default DocumentRow;