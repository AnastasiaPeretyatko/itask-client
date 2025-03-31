import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import CardTask from '@/feature/view/board/CardTask';

const CourseTaskBoard = () => {
  return (
    <SimpleGrid
      columns={[2, null, 4]}
      spacing={5}
    >
      <CardTask/>
      <CardTask/>
      <CardTask/>
      <CardTask/>
      <CardTask/>
      <CardTask/>
    </SimpleGrid>
  );
};

export default CourseTaskBoard;