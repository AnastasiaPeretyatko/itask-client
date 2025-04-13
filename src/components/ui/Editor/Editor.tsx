import { BlockNoteEditor, locales } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

import { Skeleton, useColorMode } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { redTheme } from './themeMode';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css';

type EditorProps = {
  markdown?: string;
  onChange?: (markdown: string) => void;
  editable?: boolean;
  isLocked?: boolean;
};

const Editor = ({
  markdown = '',
  onChange,
  editable = false,
  isLocked = false,
}: EditorProps) => {
  // eslint-disable-next-line import/namespace
  const locale = locales['ru'];
  const { colorMode } = useColorMode();
  const [isReady, setIsReady] = useState(false);
  const editorRef = useRef<BlockNoteEditor | null>(null);
  const initialMarkdownRef = useRef(markdown);
  const skipChangeRef = useRef(true); // Пропускаем первое изменение

  // Инициализация редактора
  const editor = useCreateBlockNote({
    initialContent: undefined,
    dictionary: {
      ...locale,
    },
  });

  // Сохраняем ссылку на редактор
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // Загрузка Markdown при инициализации или изменении пропса
  useEffect(() => {
    if (!editorRef.current || !markdown) {
      setIsReady(true);
      return;
    }

    const loadMarkdown = async () => {
      try {
        skipChangeRef.current = true; // Пропускаем изменение при загрузке

        const blocks = await editorRef.current!.tryParseMarkdownToBlocks(markdown);
        await editorRef.current!.replaceBlocks(editorRef.current!.topLevelBlocks, blocks);

        initialMarkdownRef.current = markdown;
        setIsReady(true);
      } catch (error) {
        console.error('Error loading markdown:', error);
        setIsReady(true);
      }
    };

    loadMarkdown();
  }, [markdown]);

  // Обработчик изменений
  const handleEditorChange = async () => {
    if (!editorRef.current || skipChangeRef.current || !onChange || isLocked) {
      skipChangeRef.current = false;
      return;
    }

    try {
      const currentMarkdown = await editorRef.current.blocksToMarkdownLossy(
        editorRef.current.topLevelBlocks,
      );

      // Вызываем onChange только если контент действительно изменился
      if (currentMarkdown !== initialMarkdownRef.current) {
        onChange(currentMarkdown);
        initialMarkdownRef.current = currentMarkdown;
      }
    } catch (error) {
      console.error('Error converting to markdown:', error);
    }
  };

  // if (!isReady) {
  //   return (
  //     <Skeleton
  //       height="200px"
  //       width="full"
  //     />
  //   );
  // }

  return (
    <Skeleton
      isLoaded={true}
      marginLeft={-54}
      width={'full'}
    >
      <BlockNoteView
        editor={editor}
        editable={editable ? !isLocked : editable}
        theme={redTheme[colorMode]}
        onChange={handleEditorChange}
      />
    </Skeleton>
  );
};

export default Editor;