import { BookIcon, HomeIcon, LogoutIcon, SettingsIcon, GroupsIcon } from '../customIcon';
import { DashboardIcon } from '../icon/DashboardIcon';

export const NAVBAR_ITEM = [
  {
    title: 'Главная',
    icon: <HomeIcon />,
    path: '/',
    role: ['professor', 'student'],
  },
  {
    title: 'Группы',
    icon: <GroupsIcon/>,
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
    icon: <BookIcon />,
    path: '/courses',
    role: ['professor', 'student'],
  },
  {
    title: 'Доска',
    icon: <DashboardIcon />,
    path: '/dashboard',
    role: ['student'],
  },
];

export const sidebarMenuConfig = [
  { title: 'Настройки', icon: <SettingsIcon />, path: '' },
  { title: 'Выйти', icon: <LogoutIcon />, path: '' },
];
