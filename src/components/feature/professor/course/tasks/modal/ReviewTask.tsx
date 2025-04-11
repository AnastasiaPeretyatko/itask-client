import { Box, Heading, ModalBody, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentsBox from './components/CommentsBox';
import Header from './components/Header';
import TaskProperty from './components/TaskProperty';
import Editor from '@/components/ui/Editor/Editor';
import { BodyItemProps } from '@/components/ui/modal';
import { RootState } from '@/store';
import { OptionType, Property, TaskModel } from '@/types/course.type';

const ReviewTask = ({ ...props }: BodyItemProps & {task: TaskModel}) => {
  const { course } = useSelector((state:RootState) => state.courseStore);

  const task = props.task;
  const [editor, setEditor] = useState<string>(task.text);
  const { groupId, semesterId } = task.assignment;
  const [property, setProperty] = useState<Property & {group: null | OptionType | string, semester: null | OptionType | string}>({
    group: groupId || '',
    semester: semesterId || '',
    score: task.score,
    priority: task.priority,
    tags: task.tags,
    endDate: task.endDate,
    startDate: task.startDate,
  });

  const onChengeProperty = (newProperty: Property & {group: null | OptionType, semester: null | OptionType}) => {
    setProperty(newProperty);
  };

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
          <TaskProperty
            property={property}
            onChangeProperty={onChengeProperty}
            readOnly
          />

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