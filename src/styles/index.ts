import { extendTheme } from '@chakra-ui/react';
import { breakpoints } from './breakpoints';
import { colors, semanticTokens } from './colors';
import { buttonTheme } from './components/button';
import { cardTheme } from './components/card';
import { containerTheme } from './components/container';
import { drawerTheme } from './components/drawer';
import { inputTheme } from './components/input';
import { listTheme } from './components/list';
import { modalTheme } from './components/modal';
import { popoverTheme } from './components/popover';
import { tabsTheme } from './components/tabs';
import { tagTheme } from './components/tag';

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
    Popover: popoverTheme,
    List: listTheme,
    Tag: tagTheme,
    Drawer: drawerTheme,
  },
  breakpoints,
});

export default theme;
