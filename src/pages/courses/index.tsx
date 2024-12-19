import ProfessorCoursePage from '@/components/feature/professor/course/ProfessorCoursePage'
import StudentCoursesPage from '@/components/feature/student/course/StudentCoursesPage'
import AppLayout from '@/components/layout/AppLayout'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

const PageCourses = () => {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <AppLayout>
      {user && user?.role === 'professor' ? (
        <ProfessorCoursePage />
      ) : (
        <StudentCoursesPage />
      )}
    </AppLayout>
  )
}

export default PageCourses
