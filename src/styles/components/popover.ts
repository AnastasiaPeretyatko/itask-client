import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle((props) => ({
  popper: {
    width: props.width || 'auto',
  },
  content: {
    borderRadius: 8,
    backgroundColor: 'menu.background',
    padding: 1,
    boxShadow: 'md',
    maxHeight: '20vw',
    overflow: 'auto',
    width: 'full',
  },
}));

export const popoverTheme = defineMultiStyleConfig({ baseStyle });