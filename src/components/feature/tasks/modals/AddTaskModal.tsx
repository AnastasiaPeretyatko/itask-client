import { Box, Button, Divider, Flex, HStack, Input, ModalBody, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import TaskProperty from './components/TaskProperty';
import Editor from '@/components/ui/Editor/Editor';
import { BodyItemProps } from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { createTaskThunk } from '@/store/professorModule/course/course.thunk';
import { createTask, updateTask, clearTask, updateProperty } from '@/store/task/task.slice';
import { OptionType } from '@/types/course.type';

const AddTaskModal = ({ ...props }: BodyItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { course } = useSelector((state: RootState) => state.courseStore);
  const { task } = useSelector((state: RootState) => state.task);
  const { showErrorMessage, showSuccessMessage } = useNotifications();
  const [isLoading, setIsLoading] = React.useState(false);

  const onChangeTask = (value: {[key: string]: string | OptionType | null | boolean | number | Date}) => {
    if (task) dispatch(updateTask(value));
  };

  const onChangeProperty = (value: {[key: string]: string | OptionType | null | boolean | number | Date}) => {
    if (task) dispatch(updateProperty(value));
  };

  const save = async () => {
    if (!task || !course) return;

    setIsLoading(true);
    const { property: { group, semester, ...allProperty }, ...allTask } = task;
    dispatch(createTaskThunk({
      task: {
        ...allTask,
        ...allProperty,
      },
      assignment: {
        courseId: course.id,
        semesterId: (semester as OptionType)?.id,
        groupId: (group as OptionType)?.id,
      },
    }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res);
        props?.onClose?.();
      })
      .catch(showErrorMessage)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    dispatch(createTask({}));

    return () => {
      dispatch(clearTask());
    };
  }, [dispatch]);

  if (!task) {
    return <Spinner />;
  }

  return (
    <>
      <Header
        create
        {...props}
      />
      <ModalBody as={'form'}>
        <Box
          width={'full'}
          paddingX={24}
          paddingY={2}
        >
          <Input
            variant={'title'}
            placeholder="Название задачи..."
            onChange={(e) => onChangeTask({ title: e.target.value })}
            mt={10}
            mb={6}
            value={task.title || ''}
          />
          <TaskProperty
            property={task.property}
            onChangeProperty={onChangeProperty}
          />
        </Box>
        <Divider
          borderColor={'divider'}
          mb={2}
        />
        <Flex
          flexDirection={'column'}
          flex={1}
          paddingX={24}
        >
          <Editor
            editable
            markdown={task.text || ''}
            onChange={(text) => onChangeTask({ text })}
          />
        </Flex>

        <HStack
          justify={'flex-end'}
          padding={4}
        >
          <Button
            variant={'primary'}
            size={'sm'}
            width={'max-content'}
            onClick={save}
            isLoading={isLoading}
            loadingText="Сохранение..."
          >
            Опубликовать
          </Button>
        </HStack>
      </ModalBody>
    </>
  );
};

export default AddTaskModal;