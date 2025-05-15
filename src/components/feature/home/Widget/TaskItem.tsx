import { ChevronRightIcon } from '@chakra-ui/icons';
import { Card, CircularProgress, CircularProgressLabel, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TaskListWidgetProps } from './TaskListWidget';

const TaskItem = ({ task }: {task: TaskListWidgetProps}) => {
  const router = useRouter();
  return (
    <Card
      color={'white'}
      backgroundColor={'primary.purple'}
      padding={3}
      borderRadius={16}
      flexDir={'row'}
      gap={4}

    >
      <CircularProgress
        value={+(task.totalGrade || 0)}
        max={100}
        color="white"
        trackColor={'#cabdff54'}
      >
        <CircularProgressLabel>{+(task.totalGrade || 0)}%</CircularProgressLabel>
      </CircularProgress>
      <VStack
        align={'start'}
        justify={'space-between'}
        flex={1}
      >
        <Heading
          size={'sm'}
          fontWeight={500}
          noOfLines={1}
        >{task['course.name']}</Heading>
        <Text
          color={'white.100'}
          fontSize={'sm'}
        >{task.taskCount} задач</Text>
      </VStack>
      <IconButton
        aria-label=""
        variant={'iconButton'}
        icon={<ChevronRightIcon/>}
        onClick={() => router.push(`/courses/${task['course.id']}`)}
      />
    </Card>
  );
};

export default TaskItem;