import { Button, Heading, HStack, Skeleton, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Tag, VStack, Wrap } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@/components/assets/ui/modal';
import CourseDescription from '@/components/feature/professor/course/description/CourseDescription';
import CourseMembers from '@/components/feature/professor/course/members/CourseMembers';
import CourseTaskBoard from '@/components/feature/professor/course/tasks/CourseTaskBoard';
import AppLayout from '@/components/layout/AppLayout';
import AddTask from '@/feature/AddTask';
import { AppDispatch, RootState } from '@/store';
import { fetchCourse } from '@/store/professorModule/course/course.thunk';

const CoursePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useRouter();
  const courseStore = useSelector((state: RootState) => state.courseStore);

  useEffect(() => {
    const id = query.id as string;
    if(id){
      dispatch(fetchCourse(query.id as string));
    }
  }, [dispatch, query.id]);

  return (
    <AppLayout>
      <VStack width={'full'} >
        <Skeleton
          isLoaded={!courseStore.isLoading}
          width={'full'}
          mb={3}
          display={'flex'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={4}
        >
          <HStack>
            <Heading>{courseStore.course.name}</Heading>
          </HStack>
          <Modal
            title="Добавить задание"
            height="80%"
            action={ <Button
              size={'sm'}
              variant={'primary'}
            >Добавить задание</Button> }
          >
            <AddTask/>
          </Modal>
        </Skeleton>
        <Skeleton
          isLoaded={!courseStore.isLoading}
          width={'100%'}
          mb={4}
        >
          <Wrap>
            <Tag colorScheme="green">Design</Tag>
            <Tag colorScheme="cyan">Design</Tag>
          </Wrap>
        </Skeleton>
        <Wrap>
          <Tag>kkkk</Tag>
        </Wrap>
      </VStack>
      <Tabs
        size={'sm'}
        variant={'course_tab'}
        isLazy
      >
        <TabList>
          <Tab>Описание</Tab>
          <Tab>Задания</Tab>
          <Tab>Участники</Tab>
        </TabList>
        <TabIndicator
          mt="-2px"
          height="2px"
          bg="primary.purple"
          borderRadius="5px"
        />
        <TabPanels>
          <TabPanel>
            <CourseDescription/>
          </TabPanel>
          <TabPanel>
            <CourseTaskBoard/>
          </TabPanel>
          <TabPanel>
            <CourseMembers/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  );
};

export default CoursePage;