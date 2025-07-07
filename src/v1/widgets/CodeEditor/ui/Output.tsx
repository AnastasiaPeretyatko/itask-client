import { Button, Container, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import * as monaco from 'monaco-editor';
import React, { MutableRefObject, useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { BodyItemProps } from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { executeCode } from '@/services/api.service';

type Props = {
  editorRef: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>
  language: string
  onSelectLanguage: (language: string) => void
  onSave: () => void
  handleComplete?: () => void
} & BodyItemProps

const Output = ({ editorRef, language, onSelectLanguage, onSave, onClose }: Props) => {
  const [output, setOutput] = useState<null | any[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { showErrorMessage } = useNotifications();

  const runCode = async() => {
    if(!editorRef.current) {return;}
    const sourceCode = editorRef.current.getValue();
    if(!sourceCode) {return;}
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split('\n'));
      setIsError(result.stderr);
    } catch (error) {
      if (error instanceof Error) {
        showErrorMessage(error.message);
      } else {
        showErrorMessage('Failed to run code');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      flexDir={'column'}
      w={'30%'}
      p={1}
      gap={3}
    >
      <HStack mb={4}>
        <LanguageSelector
          language={language}
          onSelect={onSelectLanguage}
        />
        <Button
          size={'sm'}
          colorScheme="green"
          onClick={runCode}
          isLoading={isLoading}
        >Run code</Button>
      </HStack>

      <Heading size={'sm'}>Output:</Heading>
      <Container
        variant={'code_output'}
        color={isError ? 'red.500' : ''}
      >
        {output ?
          output.map((line, i) => <Text key={i}>{line}</Text>)
          : <Text color={'text.pale'}>Click "Run Code" to see the output here</Text>}
      </Container>
      <Button
        variant={'primary'}
        size={'sm'}
        onClick={() => {
          onSave();
          onClose?.();
        }}
        width={'max-content'}
      >
          Сохранить
      </Button>
    </Flex>
  );
};

export default Output;