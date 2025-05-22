const chakraColors = [
  'red.400',
  'orange.400',
  'yellow.400',
  'green.400',
  'teal.400',
  'blue.400',
  'cyan.400',
  'purple.400',
  'pink.400',
];

export function getRandomChakraColor(): string {
  const index = Math.floor(Math.random() * chakraColors.length);
  return chakraColors[index];
}