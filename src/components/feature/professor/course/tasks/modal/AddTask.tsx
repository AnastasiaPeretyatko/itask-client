import { Box, Button, Divider, Flex, HStack, Input, ModalBody } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import TaskProperty from './components/TaskProperty';
import Editor from '@/components/ui/Editor/Editor';
import { BodyItemProps } from '@/components/ui/modal';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { changeTaskTitle, createTask } from '@/store/professorModule/course/course.slice';
import { createTaskThunk } from '@/store/professorModule/course/course.thunk';
import { OptionType, Property } from '@/types/course.type';

export type PropertyType = {
  group: null | OptionType | string,
  semester: null | OptionType | string
} & Property

const AddTask = ({ ...props }: BodyItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { course, temTask: task } = useSelector((state:RootState) => state.courseStore);
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const [editor, setEditor] = useState<string>('');
  const [title, setTitle] = useState<string>(task?.title || '');

  const [property, setProperty] = useState<PropertyType>({
    group: null,
    semester: null,
    score: null,
    priority: null,
    tags: null,
    endDate: null,
    startDate: new Date(),
  });

  const save = () => {
    if(!task || !course) {return;}
    const { group, semester, ...allProperty } = property;
    const { id, ...newTask } = task;
    dispatch(createTaskThunk({ task: { ...newTask, ...allProperty, text: editor },
      assignment: { courseId: course.id, semesterId: (semester as OptionType)?.id, groupId: (group as OptionType)?.id } }))
      .unwrap()
      .then((res) => {
        showSuccessMessage(res);
        props.onClose();
      })
      .catch(showErrorMessage);
  };

  const handleChangeTitle = () => {
    if (title !== task?.title) {
      dispatch(changeTaskTitle(title));
    }
  };

  const handleChangeOnKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      handleChangeTitle();
    }
  };

  useEffect(() => {
    if(task){
      setTitle(task?.title);
    }
  }, [task, task?.title]);

  useLayoutEffect(() => {
    dispatch(createTask());
  }, []);

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
            onChange={(e) => setTitle(e.target.value)}
            mt={10}
            mb={6}
            value={title}
            onBlur={handleChangeTitle}
            onKeyDown={handleChangeOnKey}
          />
          <TaskProperty
            property={property}
            onChangeProperty={setProperty}
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
            initialContent={editor}
            onChange={setEditor}
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
          >Опубликовать</Button>
        </HStack>
      </ModalBody>
    </>
  );
};

export default AddTask;