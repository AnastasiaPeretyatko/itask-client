import { HStack, Text } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { RenderOptionType } from './Multiselect';
import { OptionType } from './Option';
import Tag, { TagType } from './Tag';

type SelectedOptionsProps<T> = {
  options: OptionType<T>[];
  renderOption?: RenderOptionType<T>;
  selectionPlaceholder?: string;
  tagType?: TagType;
  onClick?: () => void;
};

export const SelectedOptions = forwardRef<HTMLDivElement, SelectedOptionsProps<unknown>>(
  ({ options, renderOption, selectionPlaceholder, tagType, onClick }, ref) => {
    if (!options.length && selectionPlaceholder) {
      return (
        <HStack
          ref={ref}
          width="full"
          height="full"
          onClick={onClick}
          align={'center'}
          padding={1}
        >
          <Text size="sm">{selectionPlaceholder}</Text>
        </HStack>
      );
    }

    return (
      <HStack
        ref={ref}
        width="full"
        height="full"
        onClick={onClick}
      >
        {options.map((option) => {
          if (renderOption) {
            return React.cloneElement(renderOption, {
              key: option.id,
              ...(renderOption.props || {}),
              option,
            });
          }

          return (
            <Tag
              key={option.id}
              type={tagType}
              label={option.label}
              color={option.color}
            />
          );
        })}
      </HStack>
    );
  },
);
