import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({})

const search = definePartsStyle({
  field: {
    fontFamily: 'mono',
    borderRadius: 'lg',
    backgroundColor: 'blackAlpha.100',
    color: 'teal.500',
    border: '1px solid',
    borderColor: 'blackAlpha.200',
    _focusVisible: {
      borderColor: 'blackAlpha.500',
      boxShadow: 'inherit',
    },
  },
  element: {
    color: 'gray.500',
  },
})

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { search },
})
