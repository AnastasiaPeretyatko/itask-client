import { Skeleton } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Editor from '@/components/assets/ui/Editor/Editor';
import { RootState } from '@/store';

const CourseDescription = () => {
  const courseStore = useSelector((state: RootState) => state.courseStore);

  return (
    <Skeleton isLoaded={!courseStore.isLoading}>
      <Editor initialContent={courseStore.course.description}/>
    </Skeleton>
  );
};

export default CourseDescription;