import { Box, Flex, Heading, HStack, useColorMode } from '@chakra-ui/react';
import { Editor, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useRef, useState } from 'react';
import { CodeEditorModalProps } from '../feature/tasks/modals/CodeEditorModal';
import Output from './components/Output';

const IdeEditor = ({ code, onChange, ...props }: CodeEditorModalProps) => {
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
      maxW={'100%'}
      height={'100%'}
      maxH={'100%'}
      overflow={'hidden'}
      flexDir={'column'}
      marginX={20}
      marginY={5}
      gap={10}
    >
      <Heading size={'md'}>Build Function</Heading>
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
            // onBeforeMount={onBeforeMount}
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