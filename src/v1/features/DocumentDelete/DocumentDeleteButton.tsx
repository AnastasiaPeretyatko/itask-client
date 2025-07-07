import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDocumentStore } from '@/v1/entites/Document/module/store';
import AlertDialog from '@/v1/shared/ui/AlerDialog/AlertDialog';

const DocumentDeleteButton = () => {
  const router = useRouter();
  const deleteDocument = useDocumentStore((state) => state.deleteDoc);

  const handleDeleteDocument = () => {
    const documentId = router.query.id;
    if (!documentId) return;

    deleteDocument(documentId as string)
      .then()
      .catch();
  };
  return (
    <AlertDialog
      callButton={<Button
        colorScheme="red"
        gap={2}
        fontWeight={500}
        leftIcon={<DeleteIcon />}
      >Удалить</Button>}
      title="Удалить документ?"
      description="Все связанные с ним данные будут удалены"
      textActiveButton="Удалить"
      onClick={handleDeleteDocument}
    />
  );
};

export default DocumentDeleteButton;