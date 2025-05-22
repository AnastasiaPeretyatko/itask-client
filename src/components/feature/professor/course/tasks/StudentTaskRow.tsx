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
// import { format } from 'date-fns';
import moment from 'moment';
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
      background={'background.main'}
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
const Task = ({ task }: {task: DashboardTask, student: StudentTask}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { solutions } = task;
  const colorGrade = useMemo(() => {
    if(task.score && solutions.grade){
      if(+task.score*0.5 > +solutions.grade){
        return 'red.400';
      } else if (+task.score*0.5 < +solutions.grade){
        return 'grean.400';
      }
    }
    return 'text.secondary';
  }, [task, solutions]);

  console.log(solutions);

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
          >{solutions.grade || 0}/{task.score}</Flex>
          <Flex align={'center'}>{TransTaskStatus[solutions.status as keyof typeof TransTaskStatus]}</Flex>
          <Flex align={'center'}>
            <IconButton
              width={'min-content'}
              variant={'iconButton'}
              aria-label="answer"
              size={'sm'}
              icon={<FolderCheckIcon boxSize={5}/>}
              color={'green'}
            />
          </Flex>

          <Flex align={'center'}>{moment(solutions.updatedAt).format('DD.MM.YYYY HH:mm')}</Flex>
        </Grid>
      </HStack>
      <Modal
        isOpenModal={isOpen}
        onCloseModal={onClose}
        title={task.title}
        renderBody={(props) => (<AnswerToTask
          // isShort
          task={task}
          // studentName={student.fullName}
          {...props}
        />)}
      />
    </>
  );
};

export default StudentTaskRow;