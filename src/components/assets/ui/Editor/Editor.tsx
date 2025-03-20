import { BlockNoteEditor, locales, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import { Box, Skeleton, useColorMode } from '@chakra-ui/react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';
import dynamic from 'next/dynamic';
import { redTheme } from './themeMode';

type EditorProps = {
  onChange?: (value: string) => void
  initialContent?: string
  editable?: boolean
  isLoaded?: boolean
}

const Editor = ({
  onChange,
  editable = false,
  initialContent,
}: EditorProps) => {
  // eslint-disable-next-line import/namespace
  const locale = locales['ru'];
  const { colorMode } = useColorMode();

  const editor: BlockNoteEditor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        default: 'Введите текст ...',
        bulletListItem: '',
        numberedListItem: '',
        checkListItem: '',
        heading: '',
      },
    },
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
  });

  return (
    <Skeleton
      isLoaded={true}
      marginLeft={-54}
      width={'full'}
    >
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme={redTheme[colorMode]}
        onChange={() => onChange && onChange(JSON.stringify(editor.document, null, 2))}
      />

    </Skeleton>
  );
};

export default dynamic(() => Promise.resolve(Editor), { ssr: false });