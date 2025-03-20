import { Skeleton, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import TaskList from './TaskList';
import Editor from '@/components/assets/ui/Editor/Editor';
import { RootState } from '@/store';

const SectionCourseTab = () => {
  const courseStore = useSelector((state: RootState) => state.courseStore);

  return (
    <Tabs
      variant={'course_tab'}
      size={'sm'}
    >
      <TabList>
        <Tab>Описание</Tab>
        <Tab>Задания</Tab>

        <Tab>Материалы</Tab>
      </TabList>
      <TabIndicator
        mt="-2px"
        height="2px"
        bg="primary.purple"
        borderRadius="5px"
      />

      <TabPanels>
        <TabPanel>
          <Skeleton isLoaded={!courseStore.isLoading}>
            <Editor initialContent={courseStore.course.description}/>
          </Skeleton>
        </TabPanel>
        <TabPanel>
          <TaskList/>
        </TabPanel>
        <TabPanel>Материалы</TabPanel>

      </TabPanels>
    </Tabs>
  );
};

export default SectionCourseTab;