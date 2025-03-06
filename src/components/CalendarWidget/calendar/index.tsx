import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import {
  addDays,
  addMonths,
  Day,
  endOfMonth,
  endOfWeek,
  getDate,
  getMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { dayWeekArray } from '@/common/const';

const Calendar = ({ onChoiceDate }: { onChoiceDate: (date: Date) => void }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prevMonthDays, setPrevMonthDays] = useState<Date[]>([]);
  const [nextMonthDays, setNextMonthDays] = useState<Date[]>([]);
  const [currentMonthDays, setCurrentMonthDays] = useState<Date[]>([]);

  const today = useMemo(() => new Date(), []);

  const handleNextMonth = (month: number) => {
    setCurrentDate((prevMonthDays) => addMonths(prevMonthDays, month));
  };

  const changeCurrentDate = (date: Date) => {
    if (prevMonthDays.some((d) => d === currentDate) ){
      setCurrentDate((prevMonthDays) => addMonths(prevMonthDays, -1));
    } else if (nextMonthDays.some((d) => d === currentDate) ){
      setCurrentDate((prevMonthDays) => addMonths(prevMonthDays, 1));
    } else {
      setCurrentDate(date);
    }
    onChoiceDate(date);
  };

  const fetchArrayMonth = () => {
    const options = { weekStartsOn: 1 as Day }; // Указываем, что неделя начинается с понедельника
    const startOfMonthDate = startOfMonth(currentDate);
    const endOfMonthDate = endOfMonth(currentDate);
    const startOfWeekDate = startOfWeek(startOfMonthDate, options);
    const endOfWeekDate = endOfWeek(endOfMonthDate, options);

    const prevMonthDaysArray = [];
    let prevDay = startOfWeekDate;
    while (prevDay < startOfMonthDate) {
      prevMonthDaysArray.push(prevDay);
      prevDay = addDays(prevDay, 1);
    }
    setPrevMonthDays(prevMonthDaysArray);

    const daysArray = [];
    let day = startOfMonthDate;
    while (day <= endOfMonthDate) {
      daysArray.push(day);
      day = addDays(day, 1);
    }
    setCurrentMonthDays(daysArray);

    const nextMonthDaysArray = [];
    let nextDay = endOfWeekDate;
    while (nextDay > endOfMonthDate) {
      nextMonthDaysArray.push(nextDay);
      nextDay = addDays(nextDay, -1);
    }
    nextMonthDaysArray.reverse();
    setNextMonthDays(nextMonthDaysArray);
  };

  useEffect(() => {
    fetchArrayMonth();
  }, [currentDate]);

  return (
    <VStack
      px={2}
      py={5}
      borderRadius={'24'}
      boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
    >
      <HStack
        width={'100%'}
        justify={'space-between'}
        mb={3}
      >
        <IconButton
          variant={'unstyled'}
          aria-label="prev"
          icon={<ArrowBackIcon />}
          onClick={() => handleNextMonth(-1)}
          _hover={{
            color: 'primary.purple',
          }}
        />
        <Heading
          size={'sm'}
          fontWeight={600}
        >
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.toLocaleString('default', { year: 'numeric' })}
        </Heading>
        <IconButton
          variant={'unstyled'}
          aria-label="next"
          icon={<ArrowForwardIcon />}
          onClick={() => handleNextMonth(1)}
          _hover={{
            color: 'primary.purple',
          }}
        />
      </HStack>
      <SimpleGrid
        columns={7}
        spacing={1}
      >
        {dayWeekArray.map((day) => (
          <Box
            key={day}
            textAlign="center"
            textTransform="uppercase"
            fontSize={'xs'}
            fontWeight={600}
          >
            {day}
          </Box>
        ))}
        {prevMonthDays.map((date) => (
          <Button
            key={date.toString()}
            variant={'day'}
            color={'text.tertiary'}
            onClick={() => changeCurrentDate(date)}
          >
            {getDate(date)}
          </Button>
        ))}
        {currentMonthDays.map((date) => (
          <Button
            key={date.toString()}
            variant={'day'}
            isActive={getDate(currentDate) === getDate(date)}
            sx={
              getDate(today) === getDate(date) &&
              getDate(currentDate) !== getDate(today) &&
              getMonth(today) === getMonth(date)
                ? {
                  border: '2px solid',
                  color: 'primary.blue',
                }
                : {}
            }
            onClick={() => changeCurrentDate(date)}
          >
            <HStack gap={'0.5'}>
              <Container
                as={'span'}
                variant={'eventPoint'}
                bg={'red'}
              />
              <Container
                as={'span'}
                variant={'eventPoint'}
                bg={'green'}
              />
              <Container
                as={'span'}
                variant={'eventPoint'}
                bg={'blue'}
              />
            </HStack>

            {getDate(date)}
          </Button>
        ))}
        {nextMonthDays.map((date) => (
          <Button
            key={date.toString()}
            variant={'day'}
            color={'text.tertiary'}
            onClick={() => changeCurrentDate(date)}
          >
            {getDate(date)}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Calendar;
