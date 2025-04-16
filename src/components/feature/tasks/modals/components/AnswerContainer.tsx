import { Box, Button, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CodeEditorModal from '../CodeEditorModal';
import Editor from '@/components/ui/Editor/Editor';
import Modal from '@/components/ui/modal';
import { AppDispatch } from '@/store';
import { addAnswer, CreateTask } from '@/store/task/task.slice';

const AnswerContainer = ({ task }: {task: CreateTask}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [answer, setAnswer] = useState('');

  const onAddAnswer = (value: string) => {
    console.log('1');

    if(!task) return;
    console.log('2');
    dispatch(addAnswer(value));
  };

  return (
    <>
      <Box width={'full'} height={'full'}>
        <Editor editable markdown={answer} onChange={setAnswer}/>
      </Box>

      <HStack width={'full'} justify={'end'}>
        <Modal
          action={
            <Button
              size={'sm'}
              _before={task.answer ? {
                content: '""',
                width: 2,
                height: 2,
                background: 'red',
                position: 'absolute',
                right: 0,
                top:0,
                borderRadius:'full',
              } : {}}
            >
              Добавить код
            </Button>}
          renderBody={(props) => <CodeEditorModal code={task?.answer} onChange={onAddAnswer} {...props}/>}
          size="full"
        />
        <Button size={'sm'} isDisabled={!answer.length}>Отправить</Button>
      </HStack>
    </>
  );
};

export default AnswerContainer;