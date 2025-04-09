import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  ModalBody,
} from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyLine from '../../../../../../feature/property/PropertyLine/PropertyLine';
import Header from './components/Header';
import Editor from '@/components/assets/ui/Editor/Editor';
import { BodyItemProps } from '@/components/assets/ui/modal';
import AddNewProperty from '@/feature/property/AddNewProperty';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { changeTaskTitle, chengeDescription, createTask } from '@/store/professorModule/course/course.slice';
import { createTaskThunk } from '@/store/professorModule/course/course.thunk';

const AddTask = ({ ...props }: BodyItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { course, temTask: task } = useSelector((state:RootState) => state.courseStore);
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const [editor, setEditor] = useState<string>('');
  const [title, setTitle] = useState<string>(task?.title || '');

  const save = () => {
    if(!task || !course) {return;}
    dispatch(chengeDescription(editor));
    dispatch(createTaskThunk({ data: { task: { ...task, title, description: editor }, assignment: { courseId: course.id } } }))
      .unwrap()
      .then((res) => showSuccessMessage(res.message))
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
          <Flex
            flexDirection={'column'}
            mb={2}
          >
            {
              task &&course?.properties ? course.properties.map((property) => (
                <PropertyLine
                  key={property.id}
                  property={property}
                  task={task}
                />
              )) : null
            }
          </Flex>
          <AddNewProperty/>
        </Box>
        {/* <Tabs variant={'task_modal'}>
          <TabList>
            <Tab>Описание</Tab>
            <Tab>Комментарии</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="black"
            borderRadius="1px"
          />

          <TabPanels>
            <TabPanel>
              <Editor
                editable
                initialContent={editor}
                onChange={setEditor}
              />
            </TabPanel>
            <TabPanel>
              <CommentsBox/>
            </TabPanel>
          </TabPanels>
        </Tabs> */}
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