import { AttachmentIcon, ChatIcon } from '@chakra-ui/icons';
import { BookIcon, HomeIcon, LogoutIcon, SettingsIcon } from '../customIcon';
import { DashboardIcon } from '../icon/DashboardIcon';

export const NAVBAR_ITEM = [
  {
    title: 'Главная',
    icon: <HomeIcon />,
    path: '/',
    role: ['professor', 'student'],
  },
  // {
  //   title: 'Группы',
  //   icon: <GroupsIcon/>,
  //   path: '/groups',
  //   role: ['professor'],
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
  {
    title: 'Чат',
    icon: <ChatIcon/>,
    path: '/chat',
    role: ['professor', 'student'],
  },
  {
    title: 'Документы',
    icon: <AttachmentIcon/>,
    path: '/doc',
    role: ['student', 'professor'],
  },
];

export const sidebarMenuConfig = [
  { title: 'Настройки', icon: <SettingsIcon />, path: '' },
  { title: 'Выйти', icon: <LogoutIcon />, path: '' },
];
