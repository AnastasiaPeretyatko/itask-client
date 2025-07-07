import { Button } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSave } from '@/components/icon';
import { useChangeDocStore } from '@/v1/entites/Document/module/changeDoc.store';
import { useDocumentStore } from '@/v1/entites/Document/module/store';

const DocumentSaveButton = () => {
  // const document = useDocumentStore((state) => state.doc);
  const isEditing = useDocumentStore((state) => state.isEditing);
  const toggleIsEdit = useDocumentStore((state) => state.toggleIsEdit);
  const saveDocument = useDocumentStore((state) => state.saveDocument);

  const { title, context } = useChangeDocStore();

  const handleSaveDocument = () => {
    saveDocument({ title, context });
    toggleIsEdit();
  };

  if (!isEditing) {
    return null;
  }

  return (
    <Button
      leftIcon={<AiOutlineSave/>}
      colorScheme="green"
      onClick={handleSaveDocument}
    >
      Сохранить
    </Button>
  );
};

export default DocumentSaveButton;