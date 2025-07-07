import { EditIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useChangeDocStore } from '@/v1/entites/Document/module/changeDoc.store';
import { useDocumentStore } from '@/v1/entites/Document/module/store';
import { useUserStore } from '@/v1/entites/User/module';

const DocumentEditButton = () => {
  const user = useUserStore((state) => state.user);
  const document = useDocumentStore((state) => state.doc);
  const toggleIsEdit = useDocumentStore((state) => state.toggleIsEdit);
  const isEditing = useDocumentStore((state) => state.isEditing);

  const changeAllDoc = useChangeDocStore((state) => state.changeAllDoc);

  const handleEditDoc = () => {
    changeAllDoc(document?.context || '', document?.title || '');
    toggleIsEdit();
  };

  if (user?.id !== document?.creatorId || isEditing) {
    return null;
  }

  return (
    <Button
      variant={'secondary'}
      leftIcon={<EditIcon/>}
      onClick={handleEditDoc}
    >
      Редактировать
    </Button>
  );
};

export default DocumentEditButton;