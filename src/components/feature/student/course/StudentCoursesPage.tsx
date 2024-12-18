import { Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import CardCourse from './CardCourse'
import SearchInput from '@/components/assets/ui/SearchInput'
import SelectUi from '@/components/assets/ui/SelectUi'
import { useEffect, useState } from 'react'
import { getListSemesterFromGroup } from '@/services/semester.service'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { getAllFromSemesterGroupThunk } from '@/store/course/course.thunk'

const StudentCoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [listSemester, setListSemester] = useState<
    { id: string; name: string }[]
  >([])
  const { user } = useSelector((state: RootState) => state.user)
  const { data: courses } = useSelector((state: RootState) => state.courses)

  const fetchListSemester = async () => {
    await getListSemesterFromGroup(user.student.group_id).then(res =>
      setListSemester(res.data)
    )
  }

  const fetchListCourse = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const semesterId = e.target.value

    dispatch(
      getAllFromSemesterGroupThunk({
        semesterId,
        groupId: user.student.group_id,
      })
    )
  }

  useEffect(() => {
    fetchListSemester()
  }, [])

  return (
    <VStack width="100%" align="start" padding={4}>
      <HStack width={'100%'} justify={'space-between'} mb={4}>
        <Heading size="md" whiteSpace={'nowrap'}>
          Мои курсы
        </Heading>
        <HStack>
          <SelectUi
            options={listSemester}
            onChange={fetchListCourse}
            placeholder="Выберите семестр"
          />
          <SearchInput placeholder="Поиск..." />
        </HStack>
      </HStack>
      <SimpleGrid width={'100%'} columns={{ sm: 1, md: 2, xl: 3 }} spacing={6}>
        {courses.map(course => (
          <CardCourse key={course.id} course={course}/>
        ))}
        {/* <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse /> */}
      </SimpleGrid>
    </VStack>
  )
}

export default StudentCoursesPage
