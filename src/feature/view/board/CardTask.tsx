import { Avatar, AvatarGroup, Box, Card, Divider, Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import ReviewTask from '@/components/feature/professor/course/tasks/modal/ReviewTask';
import { MessageIcon, PaperClipIcon } from '@/components/icon';
import Modal from '@/components/ui/modal';
import { TaskModel } from '@/types/course.type';

type Props = {
  task: TaskModel
}

const CardTask = ({ task }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        padding={3}
        gap={3}
        onClick={onOpen}
      >
        <Heading size={'sm'}>{task.title}</Heading>
        <VStack gap={0}>
          {/* TODO добавить вывод проперти */}

        </VStack>
        <Text
          size={'sm'}
          noOfLines={2}
        >{task.text}</Text>
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