import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { DotsVerticalIcon } from '@/components/icon';
import { useNotifications } from '@/hooks/useNotifications';
import { useDocumentStore } from '@/v1/entites/Document/module/store';
import AlertDialog from '@/v1/shared/ui/AlerDialog/AlertDialog';

type Props = {
  documentId: string
}

const ActionsMenu = ({ documentId }: Props) => {
  const deleteDoc = useDocumentStore((state) => state.deleteDoc);
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const handleDeleteDocument = () => {
    deleteDoc(documentId)
      .then(showSuccessMessage)
      .catch(showErrorMessage);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<DotsVerticalIcon />}
        variant={'unstyled'}
      />
      <MenuList>
        <AlertDialog
          callButton={<MenuItem
            icon={<DeleteIcon />}
          >
            Удалить
          </MenuItem>}
          title="Удалить документ?"
          description="Все связанные с ним данные будут удалены"
          textActiveButton="Удалить"
          onClick={handleDeleteDocument}
        />


      </MenuList>
    </Menu>
  );
};

export default ActionsMenu;