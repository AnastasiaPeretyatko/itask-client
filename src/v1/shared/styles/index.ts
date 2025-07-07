import { extendTheme } from '@chakra-ui/react';
import { breakpoints } from './breakpoints';
import { colors, semanticTokens } from './colors';
import { badgeTheme } from './components/badge';
import { buttonTheme } from './components/button';
import { cardTheme } from './components/card';
import { containerTheme } from './components/container';
import { drawerTheme } from './components/drawer';
import { inputTheme } from './components/input';
import { listTheme } from './components/list';
import { menuTheme } from './components/menu';
import { modalTheme } from './components/modal';
import { popoverTheme } from './components/popover';
import { tabsTheme } from './components/tabs';
import { tagTheme } from './components/tag';

const theme = extendTheme({
  colors,
  semanticTokens,
  styles: {
    global: {
      body: {
        background: 'background.main',
      },
      '&::-webkit-scrollbar': {
        width: '6px', // ширина полоски скролла
        height: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent', // фон трека
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#A0AEC0', // цвет бегунка
        borderRadius: '4px', // скругление
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#718096', // цвет при наведении
      },
    },
  },
  components: {
    Container: containerTheme,
    Button: buttonTheme,
    Input: inputTheme,
    Tabs: tabsTheme,
    Card: cardTheme,
    Modal: modalTheme,
    Popover: popoverTheme,
    List: listTheme,
    Tag: tagTheme,
    Drawer: drawerTheme,
    Menu: menuTheme,
    Badge: badgeTheme,
  },
  breakpoints,
});

export default theme;
