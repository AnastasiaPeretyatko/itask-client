import { Avatar, AvatarGroup, Box, Card, Divider, Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MessageIcon, PaperClipIcon } from '@/components/assets/icon';
import Modal from '@/components/assets/ui/modal';
import ReviewTask from '@/components/feature/professor/course/tasks/modal/ReviewTask';
import Property from '@/feature/property';
import { RootState } from '@/store';
import { TaskModel } from '@/types/course.type';
import { getTextFromEditor } from '@/utils/getTextFromEditor';

type Props = {
  task: TaskModel
}

const CardTask = ({ task }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { course } = useSelector((state: RootState) => state.courseStore);
  const description: string[] = getTextFromEditor(task.description);

  return (
    <>
      <Card
        padding={3}
        gap={3}
        onClick={onOpen}
      >
        <Heading size={'sm'}>{task.title}</Heading>
        <VStack gap={0}>
          {
            course?.properties ? course?.properties.map((p) => (
              <Property
                property={p}
                task={task}
                mode="viewProperty"
              />
            )) : null
          }

        </VStack>
        {
          description ? (
            <Text
              size={'sm'}
              color={'text.pale'}
            >{description}</Text>
          ) : null
        }
        <Divider borderColor={'divider'}/>
        <HStack justify={'space-between'}>
          <AvatarGroup
            size="sm"
            max={2}
          >
            <Avatar/>
            <Avatar/>
            <Avatar/>
            <Avatar/>
            <Avatar/>
          </AvatarGroup>
          <HStack
            color={'text.pale'}
            fontSize={'sm'}
          >
            <Box><PaperClipIcon/> 3</Box>
            <Box><MessageIcon/> 12</Box>
          </HStack>
        </HStack>

      </Card>
      <Modal
        isTask
        isOpenModal={isOpen}
        onCloseModal={onClose}
        height="80%"
        renderBody={(props) => (<ReviewTask
          task={task}
          {...props}
        />)}
      />
    </>
  );
};

export default CardTask;