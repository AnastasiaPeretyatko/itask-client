import { Heading, HStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateDocumentMenu from '@/components/feature/doc/CreateDocumentMenu';
import DocumentRow from '@/components/feature/doc/DocumentRow';
import AppLayout from '@/components/layout/AppLayout';
import { AppDispatch, RootState } from '@/store';
import { getDocumentsThunk } from '@/store/documents/documents.thunk';

const DocumentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { documents } = useSelector((state: RootState) => state.documents);

  useEffect(() => {
    dispatch(getDocumentsThunk());
  }, [dispatch]);

  return (
    <AppLayout>
      <HStack
        width={'full'}
        justify={'space-between'}
        align={'center'}
        p={4}
      >
        <Heading size={'md'}>Документы</Heading>
        <CreateDocumentMenu/>
      </HStack>
      {
        documents.map((doc) => (
          <DocumentRow
            key={doc.id}
            doc={doc}
          />
        ))
      }
    </AppLayout>
  );
};

export default DocumentsPage;