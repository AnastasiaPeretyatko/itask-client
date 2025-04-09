import { lightDefaultTheme, Theme } from '@blocknote/mantine';


const lightRedTheme = {
  colors: {
    editor: {
      text: 'rgba(0, 0, 0, 0.80)',
      background: 'inherit',
      // placeholder: 'lightgray',
    },
    menu: {
      background: '#ffffff',
      text: '#000000',
      // background: '#9b0000',
    },
    tooltip: {
      text: '#ffffff',
      background: '#4d78b8c3',
    },
    hovered: {
      text: '#0f0f0f',
      background: '#0000001f',
      // background: '#b00000',
    },
    // selected: {
    //   text: '#ffffff',
    //   background: '#c50000',
    // },
    // disabled: {
    //   text: '#9b0000',
    //   background: '#7d0000',
    // },
    shadow: 'none',
    border: 'none',
    sideMenu: '#bababa',
    highlights: lightDefaultTheme.colors!.highlights,
  },
  // borderRadius: 4,
  // fontFamily: 'Helvetica Neue, sans-serif',
} satisfies Theme;

// The theme for dark mode,
// users the light theme defined above with a few changes
const darkRedTheme = {
  ...lightRedTheme,
  colors: {
    // ...lightRedTheme.colors,
    // editor: {
    //   text: '#ffffff',
    //   // background: '#9b0000',
    // },
    // sideMenu: '#ffffff',
    // highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

// The combined "red theme",
// we pass this to BlockNoteView and then the editor will automatically
// switch between lightRedTheme / darkRedTheme based on the system theme
export const redTheme = {
  light: lightRedTheme,
  dark: darkRedTheme,
};