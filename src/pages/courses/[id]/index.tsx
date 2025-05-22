import {
  Button,
  Heading,
  HStack,
  Skeleton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseDescription from '@/components/feature/professor/course/description/CourseDescription';
import CourseMembers from '@/components/feature/professor/course/members/CourseMembers';
import CourseTaskBoard from '@/components/feature/professor/course/tasks/CourseTaskBoard';
import AddTaskModal from '@/components/feature/tasks/modals/AddTaskModal';
import { NumberIcon } from '@/components/icon';
import AppLayout from '@/components/layout/AppLayout';
import Modal from '@/components/ui/modal';
import { AppDispatch, RootState } from '@/store';
import { fetchCourse } from '@/store/professorModule/course/course.thunk';
import { getRandomChakraColor } from '@/utils/getRandomChakraColor';

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
  }, [dispatch, query.id]);

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
            renderBody={(props) => <AddTaskModal {...props} />}
          />
        </Skeleton>
        <HStack
          width={'full'}
          gap={4}
        >
          {
            course.tags?.map((tag) => (
              <Tag
                key={tag}
                colorScheme={getRandomChakraColor().split('.')[0]}
              >
                <TagLeftIcon as={NumberIcon} />
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))
          }
        </HStack>
        <Skeleton
          isLoaded={!isLoading}
          width={'100%'}
        >
          <Wrap>
            {course.learning_form ? <Tag colorScheme={getRandomChakraColor().split('.')[0]}>{course.learning_form}</Tag> : null}
            {course.language ? <Tag colorScheme={getRandomChakraColor().split('.')[0]}>{course.language}</Tag> : null}
            {course.assessment_system ? <Tag colorScheme={getRandomChakraColor().split('.')[0]}>{course.assessment_system}</Tag> : null}
            {course.access ? <Tag colorScheme={getRandomChakraColor().split('.')[0]}>{course.access}</Tag> : null}
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