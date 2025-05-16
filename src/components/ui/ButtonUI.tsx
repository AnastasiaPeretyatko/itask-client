import { Button, ButtonProps, Tooltip } from '@chakra-ui/react';
import React from 'react';

type Props = {
  variant?: 'auth'| 'primary'| 'day'| 'iconButton'| 'sidebar'| 'new_record'| 'filter' | 'secondary'
  children?: React.ReactNode | string
  tooltip?: string
} & ButtonProps

const ButtonUI = ({ children, variant, tooltip, ...props }: Props) => {
  return (
    <Tooltip
      label={tooltip}
      hasArrow
      borderRadius={4}
    >
      <Button
        variant={variant}
        gap={2}
        {...props}
      >{children}</Button>
    </Tooltip>
  );
};

export default ButtonUI;