import { Avatar, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import MenuMessage from './MenuMessage';
import { Room } from '@/types/room';

const ChatRoomItem = ({ room }: {room: Room}) => {
  const router = useRouter();
  return (
    <Card
      width={'full'}
      display={'flex'}
      flexDir={'row'}
      align={'center'}
      justify={'center'}
      gap={3}
      padding={2}
      _hover={{
        background: 'secondary.blue',
      }}
      cursor={'pointer'}
      onClick={() =>
        router.replace(
          {
            pathname: router.pathname,
            query: { ...router.query, roomId: room.id },
          },
          undefined,
          { shallow: true },
        )
      }

    >
      <Avatar size={'sm'}/>
      <VStack
        width={'full'}
        flex={1}
        align={'start'}
        gap={0}
      >
        <Heading size={'sm'}>{room.title || room.users[0].fullName}</Heading>
        {
          room.messages.length ? (
            <Text
              fontSize={'sm'}
              color={'text.pale'}
            >{room.messages[0].content}
              <Text
                as={'span'}
                fontSize={'xs'}
                color={'text.tertiary'}
              >{moment(room.messages[0].createdAt).format('HH:mm')}</Text>
            </Text>
          ) : null
        }
      </VStack>
      <HStack gap={0}>
        //TODO реализавать счетчик непрочитаных сообщений (на бэке в модели сообшения нет подходящего значения)
        <MenuMessage/>
      </HStack>
    </Card>
  );
};

export default ChatRoomItem;