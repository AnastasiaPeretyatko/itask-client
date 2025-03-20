import { Flex, HStack, Text } from '@chakra-ui/react';

const CourseTaskCard = () => {
  return (
    <HStack
      background={'background.main'}
      boxShadow={'base'}
      padding={2}
      width={'full'}
      borderRadius={8}
      justify={'space-between'}
    >
      <Flex
        fontSize={'md'}
        flex={1}
      >
        Лабораторная работа 1
      </Flex>
      <HStack color={'text.pale'}>
        {/* Кол-во возможных баллов */}
        <Text>0</Text>
      </HStack>

    </HStack>
  );
};

export default CourseTaskCard;