import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { getCourseAndTasks } from '@/services/course.service';
import { RootState } from '@/store';
import { UserRole } from '@/types/user.type';

export type TaskListWidgetProps = {
  'course.id': string;
  'course.name': string;
  taskCount: string;
  totalGrade: string;
}

const TaskListWidget = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState<TaskListWidgetProps[]>([]);

  useEffect(() => {
    if(user?.role === UserRole.Professor) return;
    getCourseAndTasks().then((res) => {
      setTaskList(res.data);
      console.log(res.data);
    });
  }, [user?.role]);

  if(user?.role === UserRole.Professor){
    return null;
  }

  return (
    <Flex
      padding={5}
      backgroundColor={'background.main'}
      borderRadius={10}
      width={'50%'}
      flexDir={'column'}
      height={'full'}
      overflowY={'auto'}
      gap={2}
    >
      {
        taskList.map((task) => (
          <TaskItem
            key={task['course.id']}
            task={task}
          />
        ))
      }
    </Flex>
  );
};

export default TaskListWidget;