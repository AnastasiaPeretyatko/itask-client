import { VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDocumentStore } from '../../entites/Document/module/store';
import DocumentWithAction from '../DocumentWithAction/DocumentWithAction';
import Empty from '@/v1/shared/ui/Empty';

const DocumentList = () => {
  const documents = useDocumentStore((state) => state.documents);
  const fetchDocuments = useDocumentStore((state) => state.fetchDocuments);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (!documents.length) {
    return <Empty>У вас пока нет документов</Empty>;
  }

  return (
    <VStack
      width={'full'}
      gap={4}
    >
      { documents.map((doc) => (<DocumentWithAction
        key={doc.id}
        document={doc}
      />)) }
    </VStack>
  );
};

export default DocumentList;