import { LogoutIcon, MenuIcon } from '@/components/customIcon'
import { Button, Container, IconButton, useBoolean, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NAVBAR_ITEM, sidebarMenuConfig } from './sidebar-config'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { settings } from '@/store/user/user.slice'
import SidebarItem from './components/SidebarItem'

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isOpenSidebar } = useSelector((state: RootState) => state.user);
  const router = useRouter()

  // const [isOpenSidebar, setIsOpenSidebar] = useBoolean(true)

  const handleClickLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/auth'
  }

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
        mt={!isOpenSidebar ? 28 : 0}
      >
        <VStack width={'100%'} align={isOpenSidebar ? 'start' : 'center'}>
          {NAVBAR_ITEM.map(el => {
            if (user && el.role.includes(user.role))
              return (
                <SidebarItem
                  key={el.title}
                  data={el}
                  isCollapse={isOpenSidebar}
                />
              )
          })}
        </VStack>
      </VStack>
      {/* <Button
        size="sm"
        variant="sidebar"
        textAlign={'center'}
        justifyContent={!collapse ? 'center' : 'start'}
        leftIcon={<LogoutIcon bgSize={3} />}
        onClick={handleClickLogOut}
      >
        {collapse && 'Выйти'}
      </Button> */}
      {
        sidebarMenuConfig.map(el => (
          <SidebarItem
            key={el.title}
            data={el}
            isCollapse={isOpenSidebar}
          />
        ))
      }
    </Container>
  )
}

export default Sidebar
