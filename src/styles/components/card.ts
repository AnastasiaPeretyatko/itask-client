import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const taskSmall = definePartsStyle({
  container: {
    width: '100%',
    padding: 4,
    bg: 'green.400',
    color: 'white',
    borderRadius: 16,
    gap: 2,
    _hover: {
      boxShadow: 'lg',
    },
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
  },
});

export const cardTheme = defineMultiStyleConfig({ variants: { taskSmall } });
