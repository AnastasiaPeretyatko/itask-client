import { Flex } from '@chakra-ui/react';
import TaskItem from './TaskItem';

const TaskListWidget = () => {
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
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>

    </Flex>
  );
};

export default TaskListWidget;