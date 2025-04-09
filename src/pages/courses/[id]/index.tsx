import { Button, Heading, Skeleton, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Tag, VStack, Wrap } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@/components/assets/ui/modal';
import CourseDescription from '@/components/feature/professor/course/description/CourseDescription';
import CourseMembers from '@/components/feature/professor/course/members/CourseMembers';
import CourseTaskBoard from '@/components/feature/professor/course/tasks/CourseTaskBoard';
import AddTask from '@/components/feature/professor/course/tasks/modal/AddTask';
import AppLayout from '@/components/layout/AppLayout';
import { AppDispatch, RootState } from '@/store';
import { fetchCourse } from '@/store/professorModule/course/course.thunk';

const CoursePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useRouter();
  const { course, isLoading } = useSelector((state: RootState) => state.courseStore);

  const tabs = [
    {
      name: 'Задания',
      tabId: 'tasks',
      content: <CourseTaskBoard />,
    },
    {
      name: 'Описание',
      tabId: 'description',
      content: <CourseDescription />,
    },
    {
      name: 'Участники',
      tabId: 'members',
      content: <CourseMembers />,
    },
  ];

  useEffect(() => {
    const id = query.id as string;
    if(id){
      dispatch(fetchCourse(query.id as string));
    }
  }, [query.id]);

  if(!course){
    return null;
  }

  return (
    <AppLayout>
      <VStack
        width={'full'}
        gap={4}
      >
        <Skeleton
          isLoaded={!isLoading}
          width={'full'}
          mb={3}
          display={'flex'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Heading>{course?.name}</Heading>
          <Modal
            height="80%"
            action={ <Button
              size={'sm'}
              variant={'primary'}
            >Добавить задание</Button> }
            isTask
            renderBody={(props) => <AddTask {...props} />}
          />
        </Skeleton>
        <Skeleton
          isLoaded={!isLoading}
          width={'100%'}
        >
          <Wrap>
            {course.learning_form ? <Tag>{course.learning_form}</Tag> : null}
            {course.language ? <Tag>{course.language}</Tag> : null}
            {course.assessment_system ? <Tag>{course.assessment_system}</Tag> : null}
            {course.access ? <Tag>{course.access}</Tag> : null}
          </Wrap>
        </Skeleton>
      </VStack>
      <Tabs
        size={'sm'}
        variant={'course_tab'}
        isLazy
      >
        <TabList>
          { tabs.map((tab) => (
            <Tab key={tab.tabId}>{tab.name}</Tab>
          )) }
        </TabList>
        <TabIndicator
          mt="-2px"
          height="2px"
          bg="primary.purple"
          borderRadius="5px"
        />
        <TabPanels>
          { tabs.map((tab) => (
            <TabPanel key={tab.tabId}>
              {tab.content}
            </TabPanel>
          )) }
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
};

export default CoursePage;