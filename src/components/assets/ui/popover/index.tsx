import { Popover as PopoverChakra, PopoverContent, PopoverProps, PopoverTrigger, Portal } from '@chakra-ui/react';
import React from 'react';

type Props = {
  disclosureContent: React.ReactNode
  children: React.ReactNode
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
      <Portal>
        <PopoverContent>
          {children}
        </PopoverContent>
      </Portal>
    </PopoverChakra>
  );
};

export default Popover;