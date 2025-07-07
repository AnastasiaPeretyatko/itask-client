import { Box, Flex, Heading, HStack, useColorMode } from '@chakra-ui/react';
import { Editor, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useRef, useState } from 'react';
import Output from './Output';
// import { CodeEditorModalProps } from '../feature/tasks/modals/CodeEditorModal';

const IdeEditor = ({ code, onChange, noMargin = false, doc, ...props }: any) => {
  const { colorMode } = useColorMode();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string | undefined>( code || '');
  const [language, setLanguage] = useState('javascript');

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: string) => {
    setLanguage(language);
  };

  const onSave = () => {
    onChange(value || '');
  };

  return (
    <Flex
      width={'100%'}
      height={'100%'}
      maxH={'100%'}
      overflow={'hidden'}
      flexDir={'column'}
      marginX={noMargin ? 0 : 20}
      marginY={noMargin ? 0 : 5}
      gap={10}
    >
      <Heading size={'md'}>{doc ? doc.title || 'Без названия' : 'Build Function'}</Heading>
      <HStack
        width={'full'}
        height={'100%'}
        flex={1}
        align={'start'}
        spacing={4}
        border={'1px solid'}
        borderColor={'divider'}
        borderRadius={10}
        padding={1}
        overflow={'hidden'}
        background={'background.main'}
      >
        <Box
          width={'60%'}
          height={'100vh'}
          maxH={'100%'}
          overflow={'hidden'}
          flex={1}
          sx={{ 'section': { flex: 1 } }}
        >
          <Editor
            language={language}
            defaultValue="// some comment"
            theme={colorMode === 'dark' ? 'vs-dark' : 'light' }
            value={value || ''}
            onChange={(value) => setValue(value)}
            onMount={onMount}
            // options={{
            //   readOnly: true,
            // }}
          />
        </Box>
        <Output
          editorRef={editorRef}
          language={language}
          onSelectLanguage={onSelect}
          onSave={onSave}
          {...props}
        />
      </HStack>

    </Flex>
  );
};

export default IdeEditor;