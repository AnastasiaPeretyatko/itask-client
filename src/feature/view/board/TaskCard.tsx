import { DragHandleIcon } from '@chakra-ui/icons';
import { Avatar, AvatarGroup, Box, Card, Divider, Heading, HStack, IconButton, Tag, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';
import ReviewTaskModal from '@/components/feature/tasks/modals/ReviewTaskModal';
import { MessageIcon, PaperClipIcon } from '@/components/icon';
import Modal from '@/components/ui/modal';
import { DashboardTask } from '@/types/task.type';
import { UserRole } from '@/types/user.type';

type TaskCardProps = {
  task: DashboardTask;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.user_task.id,
  });

  const style = transform
    ? {
      transform: `translate(${transform.x}px, ${transform.y}px)`,
      zIndex: 2,
    }
    : undefined;

  return (
    <>
      <Card
        ref={setNodeRef}
        variant={'task_card'}
        style={style}
        padding={3}
        gap={3}
        width={'full'}
        onClick={onOpen}
      >
        <HStack
          width={'full'}
          justify={'space-between'}
        >
          <Tag
            size={'sm'}
            padding={1}
            width={'fit-content'}
            colorScheme="green"
          >{task.courseName}</Tag>
          <IconButton
            {...listeners}
            {...attributes}
            aria-label="drag"
            icon={<DragHandleIcon/>}
            variant={'unstyled'}
            size={'sm'}
          />
        </HStack>


        <Heading size="sm">{task.title}</Heading>

        <VStack gap={0}>{/* TODO добавить вывод проперти */}</VStack>
        <Text
          noOfLines={2}
          whiteSpace={'pre-line'}
        >
          {task.text.replace(/\\\n/g, '\n')}
        </Text>
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
        isOpenModal={isOpen}
        onCloseModal={onClose}
        height="80%"
        renderBody={(props) => (<ReviewTaskModal
          task={task}
          role={UserRole.Student}
          courseName={task.courseName}
          {...props}
        />)}
      />
    </>
  );
};

export default TaskCard;