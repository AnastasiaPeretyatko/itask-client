import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    borderRadius: 8,
    width: 'full',
  },
});

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
});

const property = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'input.outline',
    height:'unset',
    paddingY: '7px',
    paddingX: 1,
    fontSize:'sm',
    borderRadius: 6,
  },
});

const title = definePartsStyle({
  field: {
    background: 'unset',
    height: 'unset',
    fontWeight: 700,
    fontSize: '40px',
    outline: 'unset',
    padding: 0,
    _placeholder: {
      color: 'input.placeholder',

    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { search, property, title },
});
