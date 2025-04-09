/* eslint-disable max-len */
import { Icon, IconProps } from '@chakra-ui/react';

export const DotIcon = (props: IconProps) => (
  <Icon
    {...props}
    viewBox="0 0 200 200"
  >
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);