import { extendTheme } from '@chakra-ui/react'
import { containerTheme } from './components/container'
import { buttonTheme } from './components/button'
import { inputTheme } from './components/input'
import { tabsTheme } from './components/tabs'
import { cardTheme } from './components/card'

const theme = extendTheme({
  colors: {
    PRIMARY_BLUE: '#2A85FF',
    PRIMARY_GREEN: '#83BF6E',
    PRIMARY_ORANGE: '#FF6A55',
    PRIMARY_PURPLE: '#8E59FF',

    SECONDARY_BLUE: '#B1E5FC',
    SECONDARY_GREEN: '#B5E4CA',
    SECONDARY_ORANGE: '#FFBC99',
    SECONDARY_PURPLE: '#CABDFF',

    BLACK_100: '#111315',
    BLACK_200: '#1A1D1F',
    BLACK_300: '#272B30',
    BLACK_400: '#303336',
  },
  components: {
    Container: containerTheme,
    Button: buttonTheme,
    Input: inputTheme,
    Tabs: tabsTheme,
    Card: cardTheme,
  },
  breakpoints: {
    base: '0px',
    sm: '320px',
    md: '768px',
    xl: '1024px',
    '2xl': '1280px',
  },
})

export default theme
