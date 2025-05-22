import { Button, Heading, HStack, ModalBody, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentRow from '../../doc/DocumentRow';
import { BodyItemProps } from '@/components/ui/modal';
import { AppDispatch, RootState } from '@/store';
import { getDocumentsThunk } from '@/store/documents/documents.thunk';
import { DocumentType } from '@/types/document.type';

const AddDocToAnswerModal = ({ onClose, handleDocs }: BodyItemProps & { handleDocs: (ids: DocumentType[]) => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { documents } = useSelector((state: RootState) => state.documents);
  const [docIds, setDocIds] = useState<DocumentType[]>([]);
  const router = useRouter();

  const addDocsToAnswer = () => {
    if(!docIds.length || !router.query.id) return;
    handleDocs(docIds);
    onClose?.();
  };

  useEffect(() => {
    dispatch(getDocumentsThunk());
  }, [dispatch]);

  return (
    <ModalBody
      padding={4}
      gap={4}
    >
      <Heading size={'md'}>Добавить документ</Heading>
      <VStack
        maxH={'400px'}
        overflow={'auto'}
        border={'1px solid'}
        borderColor={'divider'}
        borderRadius={'md'}
        padding={1}
        gap={0}
      >
        {
          documents.map((doc) => (
            <DocumentRow
              key={doc.id}
              doc={doc}
              isChecked={docIds.some((d) => d.id === doc.id)}
              onClick={(doc) => setDocIds((prev) => {
                const isExist = prev.some((p) => p.id === doc.id);
                return isExist ? prev.filter((p) => p.id !== doc.id) : [...prev, doc];
              })}
            />
          ))
        }
      </VStack>
      <HStack justify={'end'}>
        <Button onClick={onClose}>Отменить</Button>
        <Button
          variant={'primary'}
          isDisabled={!docIds.length}
          onClick={addDocsToAnswer}
        >Добавить</Button>
      </HStack>
    </ModalBody>
  );
};

export default AddDocToAnswerModal;