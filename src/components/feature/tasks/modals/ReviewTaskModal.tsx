import { Box, Heading, ModalBody, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnswerContainer from './components/AnswerContainer';
import CommentsBox from './components/CommentsBox';
import Header from './components/Header';
import TaskProperty from './components/TaskProperty';
import Editor from '@/components/ui/Editor/Editor';
import { BodyItemProps } from '@/components/ui/modal';
import { AppDispatch, RootState } from '@/store';
import { CreateTask, createTask } from '@/store/task/task.slice';
import { TaskModel } from '@/types/course.type';
import { UserRole } from '@/types/user.type';

type Props = {
  task: TaskModel,
  role?: UserRole,
  courseName?: string
} & BodyItemProps

const ReviewTaskModal = ({ task: oldTask, role, courseName, ...props }: Props) => {
  const { course } = useSelector((state:RootState) => state.courseStore);
  const { task } = useSelector((state:RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    setIsLoading.on();
    dispatch(createTask(oldTask));
    setIsLoading.off();
  }, [oldTask.id]);

  if(isLoading){
    return null;
  }

  return (
    <>
      <Header review courseName={courseName || course?.name} taskName={task?.title} {...props}/>
      <ModalBody as={'form'}>
        <Box width={'full'} paddingX={24} paddingY={2}>
          <Heading mt={10} mb={6}>{task?.title}</Heading>
          <TaskProperty property={task?.property as CreateTask['property']} readOnly studentRole={role === UserRole.Student}/>
        </Box>
        <Tabs variant={'task_modal'}>
          <TabList>
            <Tab>Описание</Tab>
            {role === UserRole.Student ? <Tab>Ответ</Tab> : null}
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
              <Editor markdown={task?.text} />
            </TabPanel>
            {
              role === UserRole.Student ? (
                <TabPanel>
                  <AnswerContainer task={task as CreateTask}/>
                </TabPanel>
              ) : null
            }
            <TabPanel>
              <CommentsBox/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
    </>

  );
};

export default ReviewTaskModal;