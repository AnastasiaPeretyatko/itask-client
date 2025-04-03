import {
  Box,
  Button,
  Flex, HStack, Input,
  ModalBody, Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyLine from '../../../../../../feature/property/PropertyLine/PropertyLine';
import CommentsBox from './components/CommentsBox';
import Header from './components/Header';
import Editor from '@/components/assets/ui/Editor/Editor';
import { BodyItemProps } from '@/components/assets/ui/modal';
import AddNewProperty from '@/feature/property/AddNewProperty';
import { AppDispatch, RootState } from '@/store';
import { createTask } from '@/store/professorModule/course/course.slice';
import { TaskModel } from '@/types/course.type';

const AddTask = ({ ...props }: BodyItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { course } = useSelector((state:RootState) => state.courseStore);

  const [task, setTask] = useState<TaskModel | null>(null);
  const [editor, setEditor] = useState<string>();
  const [title, setTitle] = useState<string>('');

  // const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
  //   dispatch(changeTaskTitle({ taskId: task?.id as string, title: e.target.value }));
  // };
  useEffect(() => {
    const result = dispatch(createTask());
    setTask(result.payload);
    setTitle(result.payload.title);
  }, [dispatch]);

  return (
    <>
      <Header {...props}/>
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
          />
          <Flex
            flexDirection={'column'}
            mb={2}
          >
            {
              course?.properties ? course.properties.map((property) => (
                <PropertyLine
                  key={property.id}
                  property={property}
                  task={task as TaskModel}
                />
              )) : null
            }
          </Flex>
          <AddNewProperty/>
        </Box>
        <Tabs variant={'task_modal'}>
          <TabList>
            <Tab>Описание</Tab>
            <Tab>Комментарии</Tab>
            {/* <Tab>Деятельность</Tab> */}
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
        </Tabs>
        <HStack
          justify={'flex-end'}
          padding={4}
        >
          <Button
            variant={'primary'}
            size={'sm'}
            width={'max-content'}
          >Опубликовать</Button>
        </HStack>
      </ModalBody>
    </>
  );
};

export default AddTask;