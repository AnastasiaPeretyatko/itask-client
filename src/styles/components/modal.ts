import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    background: 'modal.backdrop',
  },
  dialog: {
    background: 'modal.bg',
    borderRadius: 'md',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingX: 3,
    paddingY: 2,
    fontSize: 'lg',
    color: 'text.secondary',
  },
  closeButton: {
    position: 'unset',
    maxW: 4,
    maxH: 4,
    '& svg': {
      width: 'full',
      height: 'full',
    },
    _hover: {
      color: 'text.lighter',
    },
  },
  body: {
    paddingX: 24,
    paddingY: 2,
    height: 'calc(100% - 144px)', //TODO применять только для задач
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});