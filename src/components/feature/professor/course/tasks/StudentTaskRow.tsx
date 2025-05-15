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
import AnswerToTask from '@/components/feature/tasks/modals/AnswerToTask';
import { FolderCheckIcon } from '@/components/icon';
import Modal from '@/components/ui/modal';
import { TransTaskStatus } from '@/feature/view/board';
import { StudentTask } from '@/types/student.type';
import { DashboardTask } from '@/types/task.type';

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
            value={+(student.totalScore || 0)}
            max={100}
            size={'30px'}
            color="green.400"
          >
            <CircularProgressLabel fontSize={'10px'} >{+(student.totalScore || 0)}</CircularProgressLabel>
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
            student.tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  student={student}
                />
              );
            })
          }
        </VStack>
      </Collapse>
    </Card>
  );
};

//TODO для того чтобы в модалке отобразить имя студента
const Task = ({ task, student }: {task: DashboardTask, student: StudentTask}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user_task } = task;
  const colorGrade = useMemo(() => {
    if(task.score && user_task.grade){
      if(+task.score*0.5 > +user_task.grade){
        return 'red.400';
      } else if (+task.score*0.5 < +user_task.grade){
        return 'grean.400';
      }
    }
    return 'text.secondary';
  }, [task, user_task]);

  return (
    <>
      <HStack
        width={'full'}
        color={'text.secondary'}
        fontSize={'sm'}
        _hover={{ background: 'button.neutral.bgDarker05' }}
        borderRadius={'5'}
        padding={2}
        onClick={onOpen}
      >
        <Box width={'40%'}>{task.title}</Box>
        <Grid
          width={'60%'}
          templateColumns={'repeat(4, 1fr)'}
        >
          <Flex
            align={'center'}
            color={colorGrade}
          >{user_task.grade || 0}/{task.score}</Flex>
          <Flex align={'center'}>{TransTaskStatus[user_task.status as keyof typeof TransTaskStatus]}</Flex>
          <Flex align={'center'}>
            {user_task.answer ? (
              <IconButton
                width={'min-content'}
                variant={'iconButton'}
                aria-label="answer"
                size={'sm'}
                icon={<FolderCheckIcon boxSize={5}/>}
                color={'green'}
              />
            ) : '-'}
          </Flex>

          <Flex align={'center'}>{format(new Date(user_task.updatedAt), 'dd.MM.yyyy')}</Flex>
        </Grid>
      </HStack>
      <Modal
        isOpenModal={isOpen}
        onCloseModal={onClose}
        title={task.title}
        renderBody={(props) => (<AnswerToTask
          // isShort
          task={task.user_task}
          // studentName={student.fullName}
          {...props}
        />)}
      />
    </>
  );
};

export default StudentTaskRow;