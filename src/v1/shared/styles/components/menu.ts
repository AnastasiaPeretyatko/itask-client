import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    paddingX: 1,
    paddingY: 2,
  },
  item: {
    borderRadius: 'md',
    fontSize: 'sm',
    color: 'text.secondary',
    gap: 2,
    _hover: {
      '&[data-danger="true"]': {
        color: 'red.500',
        background: 'red.100',
      },

    },
  },
});

// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
