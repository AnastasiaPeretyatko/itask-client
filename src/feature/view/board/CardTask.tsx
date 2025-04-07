import { Avatar, AvatarGroup, Box, Card, Divider, Heading, HStack, Tag, Text } from '@chakra-ui/react';
import { MessageIcon, PaperClipIcon } from '@/components/assets/icon';
import { TaskModel } from '@/types/course.type';
import { getTextFromEditor } from '@/utils/getTextFromEditor';

type Props = {
  task: TaskModel
}

const CardTask = ({ task }: Props) => {
  const description: string[] = getTextFromEditor(task.description);
  return (
    <Card
      padding={3}
      gap={4}
    >
      <HStack>
        <Tag>medium</Tag>
        <Tag>medium</Tag>
      </HStack>
      <Heading size={'sm'}>{task.title}</Heading>
      <Text
        size={'sm'}
        color={'text.pale'}
      >{description}</Text>
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
  );
};

export default CardTask;