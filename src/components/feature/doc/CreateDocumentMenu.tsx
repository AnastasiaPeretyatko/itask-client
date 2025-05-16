import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList, Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addEmbedDoc } from '@/actions/definitions/documents';
import embeds from '@/components/Embeds';
import { FileEarmarkCodeIcon } from '@/components/icon';
import CustomMenuItem from '@/components/ui/Menu/CustomMenuItem';
import Modal from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch } from '@/store';
import { createDocumentThunk } from '@/store/documents/documents.thunk';
import { DocumentType } from '@/types/document.type';

type Props = {
  parentId?: string
};

const CreateDocumentMenu = ({ parentId }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const handleCreateDocument = (data: Partial<DocumentType>) => {
    dispatch(createDocumentThunk({ ...data, parentId }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res.message);
        router.push(`/doc/${res.data.id}`);
      })
      .catch(showErrorMessage);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        size={'sm'}
        variant={'primary'}
      >
        Добавить документ
      </MenuButton>
      <MenuList>
        <CustomMenuItem
          label="Добавить новый документ"
          icon={AddIcon}
          onClick={() => handleCreateDocument({ title: '', type: 'document' })}
        />
        <CustomMenuItem
          label="Добавить код"
          icon={FileEarmarkCodeIcon}
          onClick={() => handleCreateDocument({ title: '', type: 'code' })}
        />
        {embeds?.map((embed) => (
          <Modal
            size="lg"
            key={embed.title}
            action={<CustomMenuItem {...addEmbedDoc(embed)} />}
            renderBody={({ onClose = () => { } }) => addEmbedDoc(embed).children(onClose).content}
          />
        ))}
      </MenuList>
    </Menu>
  );
};

export default CreateDocumentMenu;