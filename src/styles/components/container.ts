import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle(() => {
  return {
    maxW: 'unset',
    width: 'unset',
    margin: 'unset',
  }
})

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
    borderRadius: '10px',
  }
})

const sidebar = defineStyle(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    height: 'full',
    position: 'sticky',
    top: 0,
  }
});

export const containerTheme = defineStyleConfig({
  baseStyle,
  variants: {
    header,
    sidebar
  }
})
