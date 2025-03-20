import { Heading, Skeleton, Tag, VStack, Wrap } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from '@/components/assets/ui/Editor/Editor';
import AppLayout from '@/components/layout/AppLayout';
import { AppDispatch, RootState } from '@/store';
import { course } from '@/store/professorModule/course/course.thunk';

const CoursePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useRouter();
  const courseStore = useSelector((state: RootState) => state.courseStore);

  useEffect(() => {
    if(query.id){
      dispatch(course.get(query.id as string));
    }
  }, [query.id]);

  return (
    <AppLayout>
      <VStack
        height={'50%'}
      >
        <Skeleton
          isLoaded={!courseStore.isLoading}
          width={'100%'}
          mb={3}
        >
          <Heading >{courseStore.course.name}</Heading>
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
        {
          courseStore.course.description ? (
            <Editor
              isLoaded={!courseStore.isLoading}
              initialContent={courseStore.course.description}
            />
          ) : null
        }
      </VStack>
      {/* <HStack
        width={'full'}
        height={'full'}
      >
        <Card
          minWidth={72}
          height={'full'}
          background={'background.main'}
          padding={3}
          alignItems={'center'}
          gap={3}
        >
          <Avatar
            size={'lg'}
            name="Vasiliy Pupkin"
          />
          <Wrap>
            <Tag width={'min-content'}>language</Tag>
            <Tag width={'min-content'}>language</Tag>
          </Wrap>
        </Card>
        <SectionCourseTab/>
      </HStack> */}
    </AppLayout>
  );
};

export default CoursePage;