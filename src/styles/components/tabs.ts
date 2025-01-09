import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys)


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
        color: 'white'
      }
    },
    display: 'flex',
    justifyContent: 'space-between',
    gap: 2
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
  }
})


export const tabsTheme = defineMultiStyleConfig({ variants: { notifications } })
