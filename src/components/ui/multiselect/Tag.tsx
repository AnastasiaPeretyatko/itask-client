import { Tag as ChakraTag, TagLabel, TagCloseButton, TagProps as TagPropsChakra } from '@chakra-ui/react';
import { HTMLProps, ReactNode } from 'react';
import { DotIcon } from '@/components/icon';

export type TagType = 'withDot' | 'withIcon' | 'link';

export type TagProps= Omit<HTMLProps<HTMLDivElement>, 'size'> & {
  selected?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg'
  type?: TagType
  onClose?: () => void
  label?: ReactNode | string;
  color?: string;
  dotColor?: string;
  closable?: boolean;
} & TagPropsChakra

const defaultTagColor = 'grey';

const Tag = ({ onClose, type, size, closable, color, dotColor, label, selected, onClick, ...props }: TagProps) => {
  const theColor = color || (!selected && '#ffffff') || defaultTagColor;

  return (
    <ChakraTag
      {...props}
      variant={'property_tag'}
      size={size}
      background={`${theColor}.200`}
      onClick={onClick}
    >
      {type === 'withDot' ? <DotIcon color={`${theColor}.400`}/> : null}
      <TagLabel>{label}</TagLabel>
      {closable ? <TagCloseButton onClick={onClose}/> : null}
    </ChakraTag>
  );
};

export default Tag;