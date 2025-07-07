import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    background: '#ffffff0d',
  },
});

const taskSmall = definePartsStyle({
  container: {
    width: '100%',
    padding: 4,
    background: 'background.main',
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

const task_card = definePartsStyle({
  container: {
    width: '100%',
    padding: 4,
    background: 'background.main',
    gap: 2,
    _hover: {
      boxShadow: 'lg',
    },
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
  },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle, variants: { taskSmall, task_card } });
