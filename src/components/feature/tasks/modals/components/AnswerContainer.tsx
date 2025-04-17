import { Box, Button, HStack, IconButton } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditorModal from '../CodeEditorModal';
import { FileEarmarkCodeIcon } from '@/components/icon';
import Editor from '@/components/ui/Editor/Editor';
import Modal from '@/components/ui/modal';
import { TaskStatus } from '@/feature/view/board';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { addAnswer, CreateTask } from '@/store/task/task.slice';
import { updateUserTaskThunk } from '@/store/task/task.thunk';

const AnswerContainer = ({ task, onClose }: {task: CreateTask, onClose: () => void}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state:RootState) => state.dashboardTask);
  const [text, setText] = useState('');
  const { showSuccessMessage, showErrorMessage } = useNotifications();

  const userTask = useMemo(() => {
    return tasks.find((t) => t.id === task.id)?.user_task;
  }, [task.id, tasks]);

  const onAddAnswer = (value: string) => {
    if(!task) return;
    dispatch(addAnswer(value));
  };

  const save = async() => {
    if(task && task.user_task && task.user_task.answer){
      await dispatch(updateUserTaskThunk({ id: task.user_task.id, task: { answer: { text, code: task.user_task.answer.code }, status: TaskStatus.RESOLVED } }))
        .unwrap()
        .then((res) => {
          showSuccessMessage(res.message);
          onClose();
        })
        .catch(showErrorMessage);
    }
  };

  if(task && task.user_task && userTask?.answer){
    const { code, text } = userTask.answer;
    return (
      <Box
        width={'full'}
        height={'full'}
      >
        {code ? (
          <IconButton
            aria-label="file code"
            variant={'unstuled'}
            size={'sm'}
            icon={<FileEarmarkCodeIcon boxSize={7}/>}
            _before={{
              content: '""',
              width: 2,
              height: 2,
              background: 'red',
              position: 'absolute',
              right: 0,
              top:0,
              borderRadius:'full',
            }}
          />
        ) : null}
        <Editor
          markdown={text}
          onChange={setText}
        />
      </Box>
    );
  }

  return (
    <>
      <Box
        width={'full'}
        height={'full'}
      >
        <Editor
          editable
          markdown={text}
          onChange={setText}
        />
      </Box>

      <HStack
        width={'full'}
        justify={'end'}
      >
        <Modal
          action={
            <Button
              size={'sm'}
              _before={task.user_task?.answer?.code ? {
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
          renderBody={(props) => (<CodeEditorModal
            code={task?.user_task?.answer?.code}
            onChange={onAddAnswer}
            {...props}
          />)}
          size="full"
        />
        <Button
          size={'sm'}
          isDisabled={!text.length}
          onClick={save}
        >Отправить</Button>
      </HStack>
    </>
  );
};

export default AnswerContainer;