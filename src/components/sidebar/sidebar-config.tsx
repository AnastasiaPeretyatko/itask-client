import { BookIcon, HomeIcon, UsersIcon } from '@/components/customIcon'

export const NAVBAR_ITEM = [
  {
    title: 'Главная',
    icon: <HomeIcon boxSize={5} color="currentColor" zIndex={1} />,
    path: '/',
    role: ['professor', 'student'],
  },
  {
    title: 'Группы',
    icon: <UsersIcon boxSize={5} color="currentColor" zIndex={1} />,
    path: '/groups',
    role: ['professor'],
  },
  // {
  //   title: 'Преподаватели',
  //   icon: <UsersIcon boxSize={5} color="currentColor" zIndex={1} />,
  //   path: '/professor',
  //   role: ['admin', 'professor'],
  // },
  // {
  //   title: 'Студенты',
  //   icon: <UsersIcon boxSize={5} color="currentColor" zIndex={1} />,
  //   path: '/student',
  //   role: ['admin', 'professor'],
  // },
  {
    title: 'Курсы',
    icon: <BookIcon boxSize={5} color="currentColor" zIndex={1} />,
    path: '/courses',
    role: ['professor', 'student'],
  },
  // {
  //   title: 'Задания',
  //   icon: <BookIcon boxSize={5} color="currentColor" zIndex={1} />,
  //   path: '/task',
  //   role: ['professor', 'student'],
  // },
]
