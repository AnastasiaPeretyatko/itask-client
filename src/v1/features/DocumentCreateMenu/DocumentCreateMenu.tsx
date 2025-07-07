import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList, Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { addEmbedDoc } from '@/actions/definitions/documents';
import embeds from '@/components/Embeds';
import { FileEarmarkCodeIcon } from '@/components/icon';
import CustomMenuItem from '@/components/ui/Menu/CustomMenuItem';
import Modal from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { useDocumentStore } from '@/v1/entites/Document/module/store';
import { DocumentType } from '@/v1/entites/Document/types/type';

const DocumentCreateMenu = ({ parentId }: { parentId?: string }) => {
  const router = useRouter();
  const { showErrorMessage } = useNotifications();
  const setDocument = useDocumentStore((state) => state.setDocument);

  const handleCreateDocument = (data: Partial<DocumentType>) => {
    setDocument(data)
      .then((res) => router.push(`/doc/${res.data.id}`))
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

export default DocumentCreateMenu;