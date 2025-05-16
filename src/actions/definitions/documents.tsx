import { DeleteIcon } from '@chakra-ui/icons';
import { createAction } from '..';
import { EmbedDescription } from '@/components/Embeds';
import AddEmbedSlide from '@/components/Embeds/AddEmbedSlide';
import DeleteDocModal from '@/components/feature/doc/DeleteDocModal';
import { FileEarmarkCodeIcon } from '@/components/icon';

export const deleteDocModal = (id: string) => createAction({
  name: () => 'Удалить документ',
  icon: DeleteIcon,
  label: 'Удалить документ',
  children: (onClose: () => void) => ({
    title: 'Удалить документ',
    content: <DeleteDocModal
      id={id}
      onClose={onClose}
    />,
  }),
  isDeleted: true,
});

export const addEmbedDoc = (embed: EmbedDescription) => createAction({
  name: (name) => name,
  icon: FileEarmarkCodeIcon,
  label: `Добавить ${embed.title}`,
  children: (onClose: () => void) => ({
    title: 'Добавить документ',
    content: <AddEmbedSlide
      onClose={onClose}
      embed={embed}
    />,
  }),
});