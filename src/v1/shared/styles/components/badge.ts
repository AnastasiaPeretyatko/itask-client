import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const document = defineStyle({
  bg: 'blue.500',
  color: 'white',
});

const googleSlide = defineStyle({
  bg: 'red.500',
  color: 'white',
});

const googleDocs = defineStyle({
  bg: 'yellow.500',
  color: 'white',
});

const code = defineStyle({
  bg: 'green.500',
  color: 'white',
});

export const badgeTheme = defineStyleConfig({
  variants: { document, googleSlide, googleDocs, code },
});