import { dayWeekArray } from '@/common/const'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import {
  addDays,
  addMonths,
  Day,
  endOfMonth,
  endOfWeek,
  getDate,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useEffect, useState } from 'react'

const Calendar = ({ onChoiceDate }: { onChoiceDate: (date: Date) => void }) => {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [prevMonthDays, setPrevMonthDays] = useState<Date[]>([])
  const [nextMonthDays, setNextMonthDays] = useState<Date[]>([])
  const [currentMonthDays, setCurrentMonthDays] = useState<Date[]>([])

  const handleNextMonth = (month: number) => {
    // возможно можно убрать month на 1
    setCurrentDate(prevMonthDays => addMonths(prevMonthDays, month))
  }

  const fetchArrayMonth = () => {
    const options = { weekStartsOn: 1 as Day } // Указываем, что неделя начинается с понедельника
    const startOfMonthDate = startOfMonth(currentDate)
    const endOfMonthDate = endOfMonth(currentDate)
    const startOfWeekDate = startOfWeek(startOfMonthDate, options)
    const endOfWeekDate = endOfWeek(endOfMonthDate, options)

    const prevMonthDaysArray = []
    let prevDay = startOfWeekDate
    while (prevDay < startOfMonthDate) {
      prevMonthDaysArray.push(prevDay)
      prevDay = addDays(prevDay, 1)
    }
    setPrevMonthDays(prevMonthDaysArray)

    const daysArray = []
    let day = startOfMonthDate
    while (day <= endOfMonthDate) {
      daysArray.push(day)
      day = addDays(day, 1)
    }
    setCurrentMonthDays(daysArray)

    const nextMonthDaysArray = []
    let nextDay = endOfWeekDate
    while (nextDay > endOfMonthDate) {
      nextMonthDaysArray.push(nextDay)
      nextDay = addDays(nextDay, -1)
    }
    nextMonthDaysArray.reverse()
    setNextMonthDays(nextMonthDaysArray)
  }

  useEffect(() => {
    fetchArrayMonth()
  }, [currentDate])

  return (
    <VStack
      px={2}
      py={5}
      borderRadius={'24'}
      boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
    >
      <HStack width={'100%'} justify={'space-between'} mb={3}>
        <IconButton
          variant={'unstyled'}
          aria-label="prev"
          icon={<ArrowBackIcon />}
          onClick={() => handleNextMonth(-1)}
          _hover={{
            color: 'PRIMARY_BLUE',
          }}
        />
        <Heading size={'sm'} fontWeight={600} color={'blackAlpha.800'}>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.toLocaleString('default', { year: 'numeric' })}
        </Heading>
        <IconButton
          variant={'unstyled'}
          aria-label="next"
          icon={<ArrowForwardIcon />}
          onClick={() => handleNextMonth(1)}
          _hover={{
            color: 'PRIMARY_BLUE',
          }}
        />
      </HStack>
      <SimpleGrid columns={7} spacing={1}>
        {dayWeekArray.map(day => (
          <Box
            key={day}
            textAlign="center"
            textTransform="uppercase"
            fontSize={'xs'}
            fontWeight={600}
            color={'blackAlpha.600'}
          >
            {day}
          </Box>
        ))}
        {prevMonthDays.map(date => (
          <Button key={date.toString()} variant={'day'} color={'gray.400'}>
            {getDate(date)}
          </Button>
        ))}
        {currentMonthDays.map(date => (
          <Button
            key={date.toString()}
            variant={'day'}
            isActive={getDate(currentDate) === getDate(date)}
            sx={
              getDate(today) === getDate(date) &&
              getDate(currentDate) !== getDate(today)
                ? {
                    border: '2px solid',
                    borderColor: 'PRIMARY_BLUE',
                  }
                : {}
            }
            onClick={() => {
              onChoiceDate(date)
              setCurrentDate(date)
            }}
          >
            <HStack gap={'0.5'}>
              <Container as={'span'} variant={'eventPoint'} bg={'red'} />
              <Container as={'span'} variant={'eventPoint'} bg={'green'} />
              <Container as={'span'} variant={'eventPoint'} bg={'blue'} />
            </HStack>

            {getDate(date)}
          </Button>
        ))}
        {nextMonthDays.map(date => (
          <Button key={date.toString()} variant={'day'} color={'gray.400'}>
            {getDate(date)}
          </Button>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default Calendar
