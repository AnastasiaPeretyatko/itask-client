import { Popover as PopoverChakra, PopoverContent, PopoverProps, PopoverTrigger } from '@chakra-ui/react';
import React from 'react';

type Props = {
  disclosureContent: React.ReactNode
  children: React.ReactNode
  width?: string | number | 'full'
} & PopoverProps

const Popover = ({ children, disclosureContent, placement = 'bottom-start', ...props }: Props) => {
  return (
    <PopoverChakra
      placement={placement}
      {...props}
    >
      <PopoverTrigger>
        {disclosureContent}
      </PopoverTrigger>
      <PopoverContent>
        {children}
      </PopoverContent>
    </PopoverChakra>
  );
};

export default Popover;