import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Heading, HStack, Input, ModalBody, VStack } from '@chakra-ui/react';
import React from 'react';
import Editor from '@/components/ui/Editor/Editor';
import StepperUi from '@/components/ui/StepperUi';
import { BodyItemProps } from '@/components/ui/modal';
import { UserTask } from '@/types/task.type';

type Props = {
  task: UserTask
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
  const [activeStep, setActiveStep] = React.useState(1);
  const [review, setReview] = React.useState<string>('');


  const renderBody = () => {
    switch (activeStep) {
    case 1:
      return (
        <VStack
          mt={4}
          align={'start'}
          pl={10}
        >
          <Heading
            size={'md'}
            color={'text.secondary'}
            mb={3}
          >Текстовый ответ на задание:</Heading>
          <Editor markdown={task.answer?.text} />
        </VStack>
      );
    case 2:
      return (
        <VStack
          mt={4}
          align={'start'}
          pl={10}
        >
          <Heading
            size={'md'}
            color={'text.secondary'}
            mb={3}
          >Оставьте отзыв для студента</Heading>
          <FormControl>
            <FormLabel>Оценка</FormLabel>
            <Input/>
          </FormControl>
          <Editor
            key={task.id}
            editable
            onChange={setReview}
            markdown={review}
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
              onClick={props.onClose}
            >Отправить ответ</Button>
          ) : null
        }
      </HStack>
    </ModalBody>
  );
};

export default AnswerToTask;