import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Avatar, Box, Card, CircularProgress, CircularProgressLabel, Collapse, Grid, HStack, IconButton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { TaskModel } from '@/types/course.type';
import { StudentTask } from '@/types/student.type';
import { UserTask } from '@/types/task.type';

type Props = {
  student: StudentTask
}

const StudentTaskRow = ({ student }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card
      width={'full'}
      cursor={'pointer'}
      onClick={onToggle}
    >
      <HStack
        justify={'space-between'}
        padding={3}
      >
        <HStack width={'40%'}>
          <Avatar size={'xs'}/>
          <Text size={'sm'}>{student.fullName}</Text>
        </HStack>
        <HStack>
          <CircularProgress
            value={40}
            size={'30px'}
            color="green.400"
          >
            <CircularProgressLabel fontSize={'10px'}>{student.totalGrade}</CircularProgressLabel>
          </CircularProgress>
          <IconButton
            aria-label="unwrap"
            variant={'unstyled'}
            size={'sm'}
            icon={isOpen ? <ChevronUpIcon boxSize={5}/> : <ChevronDownIcon boxSize={5}/>}
          />
        </HStack>
      </HStack>
      <Collapse
        in={isOpen}
        animateOpacity
        unmountOnExit
      >
        <VStack
          width={'full'}
          padding={3}
          borderTop={'1px solid'}
          borderColor={'divider'}
        >
          <HStack
            width={'full'}
            fontSize={'xs'}
            color={'text.pale'}
          >
            <Box width={'40%'}>Название</Box>
            <Grid
              width={'60%'}
              templateColumns={'repeat(3, 1fr)'}
            >
              <Box>Дата</Box>
              <Box>Оценка</Box>
              <Box>Статус</Box>
            </Grid>
          </HStack>
          {
            student.task.map((t) => {
              const { task, user_task } = t;
              return (
                <Task
                  key={user_task.id}
                  task={{ task, user_task }}
                />
              );
            })
          }
        </VStack>
      </Collapse>
    </Card>
  );
};

const Task = ({ task }: {task: {task: TaskModel, user_task: UserTask}}) => {
  return (
    <HStack
      width={'full'}
      color={'text.secondary'}
      fontSize={'sm'}
    >
      <Box width={'40%'}>{task.task.title}</Box>
      <Grid
        width={'60%'}
        templateColumns={'repeat(3, 1fr)'}
      >
        <Box>Дата</Box>
        <Box>{task.user_task.grade || 0}/{task.task.score}</Box>
        <Box>{task.user_task.status}</Box>
      </Grid>
    </HStack>
  );
};

export default StudentTaskRow;