import { SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Empty from '@/components/ui/Empty';
import CardTask from '@/feature/view/board/CardTask';
import { AppDispatch, RootState } from '@/store';
import { getAllTaskThunk } from '@/store/professorModule/course/course.thunk';

const CourseTaskBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useRouter();
  const { course } = useSelector((state: RootState) => state.courseStore);
  const id = query.id as string;

  useEffect(() => {
    console.log({ id });
    if(id){
      dispatch(getAllTaskThunk(id));
    }
  }, [dispatch, id, query.id]);

  if(course && !course.tasks?.length){
    return <Empty>У этого курса пока нет заданий</Empty>;
  }

  return (
    <SimpleGrid
      columns={[2, null, 4]}
      spacing={5}
    >
      {
        course?.tasks.map((task) => (
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