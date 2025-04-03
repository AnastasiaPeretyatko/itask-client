import { Popover as PopoverChakra, PopoverContent, PopoverProps, PopoverTrigger } from '@chakra-ui/react';
import React from 'react';

type Props = {
  disclosureContent: React.ReactNode
  children: React.ReactNode
  width?: string | number | 'full'
  maxHeight?: string | number
  contentStyle?: React.CSSProperties
} & PopoverProps

const Popover = ({ children, disclosureContent, placement = 'bottom-start', maxHeight = '20vw', contentStyle = {}, ...props }: Props) => {
  return (
    <PopoverChakra
      placement={placement}
      {...props}
    >
      <PopoverTrigger>
        {disclosureContent}
      </PopoverTrigger>
      <PopoverContent
        maxHeight={maxHeight}
        sx={contentStyle}
      >
        {children}
      </PopoverContent>
    </PopoverChakra>
  );
};

export default Popover;