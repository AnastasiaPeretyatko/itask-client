import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProfessorCoursePage from '@/components/feature/professor/course/ProfessorCoursePage';
import StudentCoursesPage from '@/components/feature/student/course/StudentCoursesPage';
import AppLayout from '@/components/layout/AppLayout';
import { RootState } from '@/store';
import { UserRole } from '@/types/user.type';

const PageCourses = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const renderContent = useMemo(() => {
    switch (user?.role) {
    case UserRole.Professor:
      return <ProfessorCoursePage />;
    case UserRole.Student:
      return <StudentCoursesPage />;
    default:
      return null;
    }
  }, [user?.role]);

  return (
    <AppLayout>{renderContent}</AppLayout>
  );
};

export default PageCourses;
