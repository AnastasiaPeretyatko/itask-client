import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);


const notifications = definePartsStyle({
  root: {
  },
  tab: {
    fontSize: 'sm',
    fontWeight: 'semibold',
    color: 'gray.500',
    _selected: {
      color: 'black',
      'span': {
        background: 'black',
        color: 'white',
      },
    },
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2,
  },
  tablist: {
    paddingX: 3,
    justifyContent: 'space-between',
    borderBottom: '2px solid',
    borderColor: 'blackAlpha.200',
  },
  tabpanel: {
    padding: 0,
    px: 3,
  },
  tabpanels: {},
  indicator: {
    background: 'black',
  },
});

const dashboard = definePartsStyle({
  root: {
    width: 'full',
    position: 'relative',
  },
  tablist: {
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  tab: {
    color: 'text.pale',
    padding: 3,
    fontSize: 'md',
    _selected: {
      color: 'text.primary',
    },
    '& svg': {
      marginRight: 2,
    },
  },
  tabpanels: {
    paddingY: 3,
  },
});

const course_tab = definePartsStyle({
  root: {
    width: 'full',
    height: 'full',
    position: 'relative',
  },
  tablist: {
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  tab: {
    color: 'text.pale',
    padding: 2,
    _selected: {
      color: 'text.primary',
    },
    '& svg': {
      marginRight: 2,
    },
  },
  tabpanels: {
    paddingY: 3,
  },
  tabpanel: {
    padding: 0,
  },
});

const task_modal = definePartsStyle({
  root: {
    height: 'full',
  },
  tablist: {
    paddingX: 24,
    paddingY: 2,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  tab: {
    fontSize: 'sm',
    fontWeight: 500,
    color: 'text.pale',
    _selected: {
      // color: 'black',
    },
  },
  tabpanel: {
    paddingX: 24,
  },
});

export const tabsTheme = defineMultiStyleConfig({
  variants: {
    notifications,
    dashboard,
    course_tab,
    task_modal,
  },
});
