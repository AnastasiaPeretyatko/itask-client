import { extendTheme } from '@chakra-ui/react'
import { containerTheme } from './components/container'
import { buttonTheme } from './components/button'
import { inputTheme } from './components/input'
import { tabsTheme } from './components/tabs'
import { cardTheme } from './components/card'
import { colors, semanticTokens } from './colors'

const theme = extendTheme({
  colors,
  semanticTokens,
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
