import { Card } from '@chakra-ui/react';
import ActionsMenu from '../DocumentAction/ActionsMenu';
import DocumentItem from '@/v1/entites/Document/components/DocumentItem';
import { DocumentType } from '@/v1/entites/Document/types/type';


type Props = {
  document: DocumentType
}
const DocumentWithAction = ({ document }: Props) => {
  return (
    <Card
      width={'full'}
      padding={4}
      gap={4}
      flexDir={'row'}
      align={'center'}
      background={'background.main'}
      cursor={'pointer'}
      _hover={{
        boxShadow: 'md',
      }}
    >
      <DocumentItem doc={document}/>
      <ActionsMenu documentId={document.id}/>
    </Card>
  );
};

export default DocumentWithAction;