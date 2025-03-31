import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  paddingInlineStart: '0px',
  paddingInlineEnd: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
});

const auth = defineStyle({
  width: '100%',
  background: 'PRIMARY_BLUE',
  _hover: {
    bgGradient: 'linear(to-b, PRIMARY_BLUE, SECONDARY_BLUE)',
  },
  _disabled: {
    background: 'SECONDARY_BLUE',
    _hover: {
      background: 'SECONDARY_BLUE',
    },
  },
});

const primary = defineStyle({
  bg: 'primary.purple',
  color: 'white',
  _hover: {
    bg: 'secondary.purple',
  },
});

const day = defineStyle({
  display: 'flex',
  flexDir: 'column-reverse',
  minW: 'unset',
  width: '40px',
  height: '40px',
  _hover: {
    bg: 'primary.blue',
    color: 'white',
  },
  _active: {
    bg: 'primary.blue',
    color: 'white',
  },
});

const iconButton = defineStyle({
  minW: 'unset',
  height: 'unset',
  padding: 1,
  _hover: {
    color: 'primary.purple',
  },
});

const openSidebar = defineStyle({
  minW: 'unset',
  width: 26,
  height: 26,
  borderRadius: 'full',
  padding: 1,
  fontSize: 'lg',
  position: 'absolute',
  zIndex: 1,
  right: -13,
  top: 23,
  backgroundColor: 'button.neutral.bgDarker05',
  boxShadow: 'dark-lg',
  _hover: {
    background: 'sidebar.hoverButton',
    color: 'sidebar.hoverText',
  },
});

const sidebar = defineStyle({
  padding: 3,
  width: 'full',
  display: 'flex',
  textAlign: 'center',
  gap: 2,
  borderRadius: 'md',
  fontSize: 'sm',
  fontWeight: '500',
  '& span': {
    margin: 'unset',
    '& svg': {
      width: 5,
      height: 5,
    },
  },
  _hover: {
    background: 'sidebar.hoverButton',
    color: 'sidebar.hoverText',
  },
  _active: {
    background: 'sidebar.hoverButton',
    color: 'sidebar.hoverText',
  },
});

const new_record = defineStyle({
  width: 'full',
  justifyContent: 'flex-start',
  outline: 'unset',
  border: 'unset',
  borderRadius: '4px',
  padding: 0,
  paddingLeft: 1,
  fontWeight: 'normal',
  fontSize: 'sm',
  color: 'text.pale',
  _hover: {
    background: 'button.neutral.bgDarker05',
  },
});

const filter = defineStyle({
  background:'none',
  color: 'text.pale',
  fontWeight: 'normal',
  paddingInline: 'unset',
  marginInline: 'unset',
  gap: 2,
  height: 'unset',
  alignItems: 'center',
  _hover: {
    color: 'text.primary',
  },
  _active: {
    color: 'text.primary',
    _before: {
      content: '""',
      width: 2,
      height: 2,
      borderRadius: 'full',
      background: 'primary.purple',
    },
  },
});

const secondary = defineStyle({
  border: '1px solid',
  borderColor: 'input.outline',
  _hover: {
    background: 'button.neutral.bgDarker05',
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { auth, sidebar, primary, day, iconButton, openSidebar, new_record, filter, secondary },
});