import { Skeleton } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Editor from '@/components/ui/Editor/Editor';
import Empty from '@/components/ui/Empty';
import { RootState } from '@/store';

const CourseDescription = () => {
  const { course, isLoading } = useSelector((state: RootState) => state.courseStore);

  if(!course?.description){
    return <Empty>У этого курса нет описания</Empty>;
  }

  return (
    <Skeleton isLoaded={!isLoading}>
      <Editor markdown={course.description} />
    </Skeleton>
  );
};

export default CourseDescription;