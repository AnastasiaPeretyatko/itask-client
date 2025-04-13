import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle(() => {
  return {
    maxW: 'unset',
    width: 'unset',
    margin: 'unset',
    paddingInline: 'unset',
    marginInline: 'unset',
  };
});

const header = defineStyle(() => {
  return {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: 'background.main',
    width: 'full',
    display: 'flex',
    flexDir: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '20px',
    padding: 4,
    boxShadow: '0 4px 2px -2px #80808021',
  };
});

const sidebar = defineStyle(() => {
  return {
    backgroundColor: 'background.main',

    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    position: 'sticky',
    top: 0,
    padding: 4,
    gap: 4,
  };
});

const eventPoint = defineStyle(() => {
  return {
    content: '""',
    maxW: 1,
    width: 1,
    height: 1,
    borderRadius: 'full',
    padding: 0,
  };
});

const calendarWidget = defineStyle({
  width: 320,
  height: 'full',
  background: 'background.main',
  padding: 0,
  borderRadius: 24,
});

const property_label = defineStyle({
  width: '160px',
  minWidth: '160px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  color: 'text.pale',
});

const column_board = defineStyle({
  height: '100%',
  borderRadius: 'md',
  display:'flex',
  flexDirection:'column',
  gap: 2,
});

const circle = defineStyle({
  position: 'absolute',
  borderRadius: 'full',
  opacity: 0.5,
});

const wrapper = defineStyle({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: 3,
  background: 'background.main',
  borderRadius: 'lg',
  boxShadow: 'md',
});

const property_modal = defineStyle({
  position: 'relative',
  width: 'full',
  height: 'full',
  cursor: 'pointer',
  display: 'flex',
  flex: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 'sm',
  gap: 1,
  padding: 1,
  borderRadius: 3,
  _hover: {
    background: 'button.neutral.bgDarker05',
  },
});

const property_card = defineStyle({
  position: 'relative',
  width: 'full',
  height: 'full',
  display: 'flex',
  flex: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: 'sm',
  gap: 1,
  padding: 1,
  borderRadius: 3,
});

const property_title = defineStyle({
  display: 'flex',
  alignItems: 'center',
  minW: '180px',
  height: '100%',
  color: 'text.pale',
  overflow: 'hidden',
  gap: 1,
  padding: 1,
  borderRadius: 3,
  cursor: 'pointer',

  '& p': {
    fontSize: 'sm',
    fontWeight: '500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  _hover: {
    background: 'button.neutral.bgDarker05',
  },
});

export const containerTheme = defineStyleConfig({
  baseStyle,
  variants: {
    header,
    sidebar,
    eventPoint,
    calendarWidget,
    property_label,
    column_board,
    circle,
    wrapper,
    property_modal,
    property_card,
    property_title,
  },
});
