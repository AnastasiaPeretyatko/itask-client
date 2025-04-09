import { SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '@/components/assets/ui/Empty';
import CardTask from '@/feature/view/board/CardTask';
import { AppDispatch, RootState } from '@/store';
import { getAllTaskThunk } from '@/store/professorModule/course/course.thunk';

const CourseTaskBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useRouter();
  const { course } = useSelector((state: RootState) => state.courseStore);
  const id = query.id as string;

  useEffect(() => {
    if(id){
      dispatch(getAllTaskThunk(id));
    }
  }, [dispatch, id]);

  if(!course || !course.tasks){
    return <Empty>Заданий у этого курса нет</Empty>;
  }

  return (
    <SimpleGrid
      columns={[2, null, 4]}
      spacing={5}
    >
      {
        course.tasks.map((task) => (
          <CardTask
            key={task.id}
            task={task}
          />
        ))
      }
    </SimpleGrid>
  );
};

export default CourseTaskBoard;