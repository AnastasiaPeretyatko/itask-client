import { createAction } from '..';
import { EmbedDescription } from '@/components/Embeds';
import AddEmbedSlide from '@/components/Embeds/AddEmbedSlide';
import { FileEarmarkCodeIcon } from '@/components/icon';

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