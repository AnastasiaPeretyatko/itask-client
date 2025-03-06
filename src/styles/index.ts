import { extendTheme } from '@chakra-ui/react';
import { colors, semanticTokens } from './colors';
import { buttonTheme } from './components/button';
import { cardTheme } from './components/card';
import { containerTheme } from './components/container';
import { inputTheme } from './components/input';
import { modalTheme } from './components/modal';
import { tabsTheme } from './components/tabs';

const theme = extendTheme({
  colors,
  semanticTokens,
  components: {
    Container: containerTheme,
    Button: buttonTheme,
    Input: inputTheme,
    Tabs: tabsTheme,
    Card: cardTheme,
    Modal: modalTheme,
  },
  breakpoints: {
    base: '0px',
    sm: '320px',
    md: '768px',
    xl: '1024px',
    '2xl': '1280px',
  },
});

export default theme;
