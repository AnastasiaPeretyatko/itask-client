import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  content: {
    borderRadius: 8,
    backgroundColor: 'menu.background',
    marginTop: 1,
    padding: 1,
    boxShadow: 'md',
    maxHeight: '20vw',
    overflow: 'auto',
    width: '100%',
  },
});

export const popoverTheme = defineMultiStyleConfig({ baseStyle });