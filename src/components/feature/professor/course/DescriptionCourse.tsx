import { Heading, Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Editor from '@/components/assets/ui/Editor/Editor';
import Drawer from '@/components/assets/ui/drawer';
import { RootState } from '@/store';

const DescriptionCourse = () => {
  const courseStore = useSelector((state: RootState) => state.courseStore);

  return (
    <Drawer
      size="lg"
      action={<IconButton
        variant={'unstyled'}
        aria-label="open drawer"
        icon={<Icon/>}
      />}
    >
      <>
        <Heading
          size={'md'}
          mb={4}
        >
          Описание курса
        </Heading>
        <Editor
          isLoaded={!courseStore.isLoading}
          initialContent={courseStore.course.description}
        />
      </>
    </Drawer>
  );
};

export default DescriptionCourse;