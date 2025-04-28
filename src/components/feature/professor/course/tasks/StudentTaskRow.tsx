import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  CircularProgressLabel,
  Collapse,
  Flex,
  Grid,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { FolderCheckIcon } from '@/components/icon';
import { TransTaskStatus } from '@/feature/view/board';
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
    >
      <HStack
        justify={'space-between'}
        padding={3}
        onClick={onToggle}
      >
        <HStack width={'40%'}>
          <Avatar size={'xs'}/>
          <Text size={'sm'}>{student.fullName}</Text>
        </HStack>
        <HStack>
          <CircularProgress
            value={+student.totalGrade}
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
              templateColumns={'repeat(4, 1fr)'}
            >
              <Box>Оценка</Box>
              <Box>Статус</Box>
              <Box>Ответ</Box>
              <Box>Дата</Box>
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
  const { user_task } = task;
  const colorGrade = useMemo(() => {
    if(task.task.score && user_task.grade){
      if(+task.task.score*0.5 > +user_task.grade){
        return 'red.400';
      } else if (+task.task.score*0.5 < +user_task.grade){
        return 'grean.400';
      }
    }
    return 'text.secondary';
  }, [task, user_task]);

  return (
    <HStack
      width={'full'}
      color={'text.secondary'}
      fontSize={'sm'}
    >
      <Box width={'40%'}>{task.task.title}</Box>
      <Grid
        width={'60%'}
        templateColumns={'repeat(4, 1fr)'}
      >
        <Flex
          align={'center'}
          color={colorGrade}
        >{user_task.grade || 0}/{task.task.score}</Flex>
        <Flex align={'center'}>{TransTaskStatus[user_task.status as keyof typeof TransTaskStatus]}</Flex>
        {user_task.answer ? (
          <IconButton
            width={'min-content'}
            variant={'unstyled'}
            aria-label="answer"
            icon={<FolderCheckIcon boxSize={5}/>}
          />
        ) : null}
        <Flex align={'center'}>{format(new Date(user_task.updatedAt), 'dd.MM.yyyy')}</Flex>
      </Grid>
    </HStack>
  );
};

export default StudentTaskRow;