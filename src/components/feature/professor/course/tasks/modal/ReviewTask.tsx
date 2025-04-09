import { Box, Heading, ModalBody, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentsBox from './components/CommentsBox';
import Header from './components/Header';
import Editor from '@/components/ui/Editor/Editor';
import { BodyItemProps } from '@/components/ui/modal';
import { RootState } from '@/store';
import { TaskModel } from '@/types/course.type';

const ReviewTask = ({ ...props }: BodyItemProps & {task: TaskModel}) => {
  const { course } = useSelector((state:RootState) => state.courseStore);

  const task = props.task;
  const [editor, setEditor] = useState<string>('');

  return (
    <>
      <Header
        review
        courseName={course?.name}
        taskName={task?.title}
        {...props}
      />
      <ModalBody as={'form'}>
        <Box
          width={'full'}
          paddingX={24}
          paddingY={2}
        >
          <Heading
            mt={10}
            mb={6}
          >{task.title}</Heading>

        </Box>
        <Tabs variant={'task_modal'}>
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
                initialContent={editor}
                onChange={setEditor}
              />
            </TabPanel>
            <TabPanel>
              <CommentsBox/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalBody>
    </>
  );
};

export default ReviewTask;