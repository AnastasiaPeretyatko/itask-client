import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Container, IconButton, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarItem from './components/SidebarItem';
import { NAVBAR_ITEM, sidebarMenuConfig } from './sidebar-config';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { AppDispatch, RootState } from '@/store';
import { settings } from '@/store/user/user.slice';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isOpenSidebar } = useSelector((state: RootState) => state.user);

  const handleClickLogOut = () => dispatch(settings.logout());

  const setCollapse = () => dispatch(settings.toggleSidebar(!isOpenSidebar));

  useEffect(() => {
    const state = localStorage.getItem('sidebar');

    const isSidebarOpen = state !== null ? state === 'true' : true;
    if (isOpenSidebar !== isSidebarOpen) {
      dispatch(settings.toggleSidebar(isSidebarOpen));
    }
  }, [dispatch, isOpenSidebar]);

  return (
    <Container
      variant="sidebar"
      boxShadow={'base'}
      maxW={isOpenSidebar ? 250 : 20}
      transition=" max-width ease-in-out .2s"
    >
      <IconButton
        variant="openSidebar"
        aria-label="open-sidebar"
        icon={!isOpenSidebar ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        onClick={setCollapse}
      />

      <VStack
        height="100%"
        justify="space-between"
        align={isOpenSidebar ? 'center' : 'start'}
        width={'100%'}
        position={'relative'}
      >
        <VStack
          width={'100%'}
          align={isOpenSidebar ? 'start' : 'center'}
        >
          {NAVBAR_ITEM.map((el) => {
            if (user && el.role.includes(user.role))
            {return (
              <SidebarItem
                key={el.title}
                data={el}
                isCollapse={isOpenSidebar}
              />
            );}
          })}
        </VStack>
      </VStack>
      <ThemeToggle isOpenSidebar={isOpenSidebar}/>
      {
        sidebarMenuConfig.map((el) => (
          <SidebarItem
            key={el.title}
            data={el}
            isCollapse={isOpenSidebar}
            onClick={el.title === 'Выйти' ? handleClickLogOut : undefined}
          />
        ))
      }
    </Container>
  );
};

export default Sidebar;
