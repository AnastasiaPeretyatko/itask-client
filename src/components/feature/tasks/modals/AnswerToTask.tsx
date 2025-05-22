import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Heading, HStack, Input, ModalBody, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentCard from '../../doc/DocumentCard';
import Editor from '@/components/ui/Editor/Editor';
import StepperUi from '@/components/ui/StepperUi';
import { BodyItemProps } from '@/components/ui/modal';
import { TaskStatus } from '@/feature/view/board';
import { useNotifications } from '@/hooks/useNotifications';
import { AppDispatch, RootState } from '@/store';
import { getAnswerTaskThunk, updateUserTaskThunk } from '@/store/task/task.thunk';
import { DashboardTask } from '@/types/task.type';

type Props = {
  task: DashboardTask
} & BodyItemProps

const steps = [
  {
    title: 'Проверка',
    description: 'Проверить задание',
  },
  {
    title: 'Отзыв',
    description: 'Оставить отзыв',
  },
  // {
  //   title: 'Результат',
  //   description: 'Оценить работу студента',
  // },
];

const AnswerToTask = ({ task, ...props }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeStep, setActiveStep] = React.useState(1);
  const [review, setReview] = React.useState<string>('');
  const [rate, setRate] = React.useState<number>(0);
  const { userTask } = useSelector((state:RootState) => state.newTask);
  const { showErrorMessage, showSuccessMessage } = useNotifications();

  const handleSubmit = () => {
    console.log(task, rate, task?.score);
    if(task && rate <= (+task.score || 100)) {
      dispatch(updateUserTaskThunk({
        id: task.id,
        task: {
          ...task.solutions,
          status: TaskStatus.RESOLVED,
          grade: rate,
          comment: review,
        } }))
        .unwrap()
        .then((res) => {
          showSuccessMessage(res);
          props.onClose?.();
        })
        .catch(showErrorMessage);
    }
  };

  useEffect(() => {
    dispatch(getAnswerTaskThunk({ taskId: task.id, studentId: task.solutions.student_id }));
  }, [dispatch, task.id, task.solutions.student_id]);

  if(!userTask){
    return null;
  }

  const renderBody = () => {
    switch (activeStep) {
    case 1:
      return (
        <VStack
          mt={4}
          align={'start'}
          pl={10}
          gap={4}
        >
          <Heading
            size={'md'}
            color={'text.secondary'}
            mb={3}
          >Текстовый ответ на задание:</Heading>
          {
            userTask.documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
              />
            ))
          }
          <Editor
            markdown={userTask.answer?.text}
            isLeftPadding
          />
        </VStack>
      );
    case 2:
      return (
        <VStack
          mt={4}
          align={'start'}
          p={7}
          gap={4}
        >
          <Heading
            size={'md'}
            color={'text.secondary'}
            mb={3}
          >Оставьте отзыв для студента</Heading>
          <FormControl
            display={'flex'}
            flexDir={'row'}
            alignItems={'center'}
            gap={4}
          >
            <FormLabel
              m={0}
              color={'text.secondary'}
            >Оценка:</FormLabel>
            <Input
              type="number"
              max={task.score || 100}
              value={rate}
              onChange={(e) => setRate(+e.target.value)}
            />
            <Text>/{task.score}</Text>
          </FormControl>
          <Text
            color={'text.secondary'}
          >Оставьте отзыв:</Text>
          <Editor
            key={task.id}
            editable
            onChange={setReview}
            markdown={review}
            isLeftPadding
          />
        </VStack>
      );
    case 3:
      return null;
    default:
      return null;
    }
  };
  return (
    <ModalBody padding={4}>
      <StepperUi
        steps={steps}
        activeIndex={activeStep}
      />
      {renderBody()}
      <HStack
        width={'full'}
        justifyContent={'end'}
        paddingY={4}
      >
        {activeStep > 1 && activeStep ? (
          <Button
            variant={'primary'}
            size={'sm'}
            leftIcon={<ArrowBackIcon/>}
            onClick={() => setActiveStep((prev) => prev-1)}
          >Назад</Button>
        ) : null}
        {activeStep < steps.length ? (
          <Button
            variant={'primary'}
            size={'sm'}
            rightIcon={<ArrowForwardIcon/>}
            onClick={() => setActiveStep((prev) => prev+1)}
          >Следующее</Button>
        ) : null}
        {
          activeStep === steps.length ? (
            <Button
              variant={'primary'}
              size={'sm'}
              onClick={handleSubmit}
            >Отправить ответ</Button>
          ) : null
        }
      </HStack>
    </ModalBody>
  );
};

export default AnswerToTask;