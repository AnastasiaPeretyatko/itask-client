import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Card, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BookIcon } from '@/components/customIcon';

const CourseItem = () => {
  return (
    <Card
      borderRadius={10}
      backgroundColor={'primary.purple'}
      padding={3}
      color={'white'}
      flexDir={'row'}
      gap={4}
      fontSize={'lg'}
      minW={'300px'}
    >
      <Flex
        padding={3}
        backgroundColor={'#cabdff54'}
        borderRadius={12}
      >
        <BookIcon boxSize={8}/>
      </Flex>
      <VStack
        width={'full'}
        align={'start'}
      >
        <Text>ksjdgveir</Text>
        <HStack
          width={'full'}
          justify={'end'}
        >
          <ArrowForwardIcon/>
        </HStack>
      </VStack>
    </Card>
  );
};

export default CourseItem;