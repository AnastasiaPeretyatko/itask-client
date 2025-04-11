import { Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { getDate, getDay } from 'date-fns';
import React, { useState } from 'react';
import Task from './Task';
import Calendar from './calendar';
import { dayWeekArray } from '@/common/const';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <Container variant={'calendarWidget'}>
      <Calendar onChoiceDate={setCurrentDate}/>
      <VStack
        align={'start'}
        px={5}
        py={2}
      >
        <HStack
          height={'max-content!'}
          align={'stretch'}
          gap={4}
        >
          <VStack gap={0}>
            <Heading size={'lg'}>{getDate(currentDate)}</Heading>
            <Text fontSize={'md'}>
              {dayWeekArray.find((_, indx) => !getDay(currentDate) ? indx === dayWeekArray.length - 1 : indx + 1 === getDay(currentDate))}
            </Text>
          </VStack>
          <Flex
            flexDir={'column'}
            gap={0}
            align={'start'}
            justify={'space-between'}
            maxH={'100%'}
            pt={2}
            pb={0.5}
          >
            {/* Решить с тем что тут показывать вместо Сегодня */}
            <Heading fontSize={'lg'}>Today</Heading>
            <Text
              fontSize={'sm'}
              color={'blackAlpha.500'}
              fontWeight={600}
            >
              2 events and 3 tasks
            </Text>
          </Flex>
        </HStack>
        <Task />
        <Task />
      </VStack>
    </Container>
  );
};

export default CalendarWidget;
