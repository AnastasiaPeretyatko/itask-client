import { listAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle(() => ({}));

const property_list = definePartsStyle({
  container: {
    fontSize: 'sm',
    color: 'text.secondary',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  item: {
    width:'full',
    padding: 1,
    borderRadius: 4,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,

    _hover: {
      background: 'button.neutral.bgDarker05',
    },
  },
  icon: {},
});

export const listTheme = defineMultiStyleConfig({ baseStyle, variants: { property_list } });