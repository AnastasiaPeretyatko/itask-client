import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Container, IconButton, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import ThemeToggle from '../assets/ui/ThemeToggle';
import SidebarItem from './components/SidebarItem';
import { NAVBAR_ITEM, sidebarMenuConfig } from './sidebar-config';
import { AppDispatch, RootState } from '@/store';
import { settings } from '@/store/user/user.slice';

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpenSidebar } = useSelector((state: RootState) => state.user);

  const handleClickLogOut = () => dispatch(settings.logout());

  const setCollapse = () => dispatch(settings.toggleSidebar(!isOpenSidebar));

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
            // if (user && el.role.includes(user.role))
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
            onClick={handleClickLogOut}
          />
        ))
      }
    </Container>
  );
};

export default Sidebar;
