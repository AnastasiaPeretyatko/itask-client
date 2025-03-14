import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
});

const property_tag = definePartsStyle({
  container: {
    borderRadius: 4,
    height: 'fit-content',
  },

  label: {
    cursor: 'pointer',
    color: 'text.primary',
    fontSize: 'sm',
    padding: 1,
  },
});

export const tagTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    property_tag,
  },
});