import { LogoutIcon, MenuIcon } from '@/components/customIcon'
import { Button, Container, IconButton, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NAVBAR_ITEM } from './sidebar-config'
import { CloseIcon } from '@chakra-ui/icons'

type Props = {
  collapse: boolean
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ collapse, setCollapse }: Props) => {
  const router = useRouter()
  // const { user } = useSelector((state: RootState) => state.user)

  // const handleClickLogOut = () => {
  //   const refreshToken = localStorage.getItem('refreshToken')
  //   if(!refreshToken) return
  //   LogOutRequest(refreshToken).then(res => {
  //     localStorage.clear()
  //     router.push('/login')
  //   })
  // }

  return (
    <Container variant="sidebar" boxShadow={'base'}>
      <IconButton
        aria-label="menu"
        variant="unstyled"
        // width={'100%'}
        // width={'min-content'}
        textAlign={collapse ? 'end' : 'center'}
        icon={collapse ? <CloseIcon /> : <MenuIcon />}
        fontSize={'xs'}
        onClick={() => setCollapse(!collapse)}
      />

      <VStack
        height="100%"
        justify="space-between"
        align={collapse ? 'center' : 'start'}
        maxW={!collapse ? 0 : 250}
      >
        <VStack align={collapse ? 'start' : 'center'}>
          {NAVBAR_ITEM.map(el => {
            return (
              <Button
                key={el.title}
                size="sm"
                variant="sidebar"
                textAlign={'center'}
                justifyContent={!collapse ? 'center' : 'start'}
                leftIcon={el.icon}
                onClick={() => router.push(el.path)}
                isActive={router.pathname === el.path}
              >
                {collapse && el.title}
              </Button>
            )
          })}
        </VStack>

        <Button
          size="sm"
          variant="sidebar"
          leftIcon={<LogoutIcon bgSize={3} color="white" zIndex={1} m={4} />}
          // onClick={handleClickLogOut}
          color="white"
        >
          {collapse && 'Выйти'}
        </Button>
      </VStack>
    </Container>
  )
}

export default Sidebar
