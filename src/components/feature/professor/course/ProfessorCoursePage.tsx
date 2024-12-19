import {
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import SearchInput from '@/components/assets/ui/SearchInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import dynamic from 'next/dynamic'
import { getAllByProfessorThunk } from '@/store/professor.course/professor.course.thunk'
import CardCourse from '../../student/course/CardCourse'

const NotFoundImage = dynamic(
  () => import('@/components/assets/animation/not-found'),
  { ssr: false }
)

const ProfessorCoursePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const { data: courses } = useSelector(
    (state: RootState) => state.professorCourse
  )

  useEffect(() => {
    if(!user?.professorId) return
    dispatch(getAllByProfessorThunk(user?.professorId))
  }, [])

  return (
    <VStack width="100%" align="start" padding={4}>
      <HStack width={'100%'} justify={'space-between'} mb={4}>
        <Heading size="md" whiteSpace={'nowrap'}>
          Мои курсы
        </Heading>
        <HStack>
          {/* <SelectUi
            options={listSemester}
            onChange={fetchListCourse}
            placeholder="Выберите семестр"
          /> */}
          <SearchInput placeholder="Поиск..." />
        </HStack>
      </HStack>
      <SimpleGrid width={'100%'} columns={{ sm: 1, md: 2, xl: 3 }} spacing={6}>
        {courses.map(course => (
          <CardCourse key={course.id} course={course} />
        ))}
      </SimpleGrid>
      {courses && !courses.length && (
        <Flex width={'100%'} flexDir="column" align="center" justify="center">
          <NotFoundImage />
          <Heading fontSize={'xl'} fontWeight={600}>
            Курсы не найдены
          </Heading>
          <Text color={'gray.500'}>По вашему запросу ничего не найдено</Text>
        </Flex>
      )}
    </VStack>
  )
}

export default ProfessorCoursePage
