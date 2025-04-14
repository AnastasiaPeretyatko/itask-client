import { Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { format, getDate, getDay, getMonth } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task from './Task';
import Calendar from './calendar';
import { dayWeekArray } from '@/common/const';
import { AppDispatch, RootState } from '@/store';
import { getStudentsAndTaskThunk } from '@/store/studentModule/tasks/dashboard.thunk';

const CalendarWidget = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: RootState) => state.dashboardTask);
  const month = format(new Date(), 'yyyy-MM');
  const [currentDate, setCurrentDate] = useState(new Date());

  const taskOnDate = useMemo(() => {
    return tasks.filter((t) => t.endDate && getDate(currentDate) === getDate(t.endDate) && getMonth(currentDate) === getMonth(t.endDate));
  }, [currentDate, tasks]);

  useEffect(() => {
    dispatch(getStudentsAndTaskThunk({ id: '97d494f1-493f-4605-8c85-bac1252e962d', params: { month } } ));
  }, []);

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
              У вас {taskOnDate.length} заданий
            </Text>
          </Flex>
        </HStack>
        {
          taskOnDate.map((t) => (
            <Task
              key={t.id}
              task={t}
            />
          ))
        }
      </VStack>
    </Container>
  );
};

export default CalendarWidget;
