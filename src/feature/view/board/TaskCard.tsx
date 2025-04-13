import { DragHandleIcon } from '@chakra-ui/icons';
import { Avatar, AvatarGroup, Box, Card, Divider, Heading, HStack, IconButton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import ReviewTask from '@/components/feature/professor/course/tasks/modal/ReviewTask';
import { MessageIcon, PaperClipIcon } from '@/components/icon';
import Modal from '@/components/ui/modal';
import { DashboardTask } from '@/types/task.type';
import { getTextFromEditor } from '@/utils/getTextFromEditor';

type TaskCardProps = {
  task: DashboardTask;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.user_task.id,
  });
  const description: string[] = getTextFromEditor(task.text);

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
          <Heading size="sm">{task.title}</Heading>
          <IconButton
            {...listeners}
            {...attributes}
            aria-label="drag"
            icon={<DragHandleIcon/>}
            variant={'unstyled'}
            size={'sm'}
          />
        </HStack>
        <VStack gap={0}>{/* TODO добавить вывод проперти */}</VStack>
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
          role="student"
          {...props}
        />)}
      />
    </>
  );
};

export default TaskCard;