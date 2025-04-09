import { Box, Flex, Input, Text } from '@chakra-ui/react';
import React, { ChangeEvent, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { RenderItemType, RenderOptionType } from './Multiselect';
import { OptionType } from './Option';
import Tag, { TagType } from './Tag';

export type OptionSelectorType<T> = {
  selectedOptions: OptionType<T>[];
  unSelectedOptions: OptionType<T>[];
  colorForCreation?: string | null;
  onSelectOption?: (option: OptionType<T>) => void;
  onCreateOption?: (label: string) => void;
  removeSelectedOption?: (option: OptionType<T>) => void;
  canCreateOptions?: boolean;
  canModifyOptions?: boolean;
  canReorderOptions?: boolean;
  uniqueLabel?: boolean;
  tagType?: TagType;
  onOptionsChange?: (options: OptionType<T>[]) => void;
  onRemoveOption?: (option: OptionType<T>) => void;
  // sorterProps?: Partial<OptionsSorterProps<T>>;
  renderOption?: RenderOptionType<T>;
  renderItem?: RenderItemType<T>;
  // sorterWrapperProps?: HTMLProps<HTMLDivElement>;
  search?: string;
  onSearch?: (term: string) => void;
} & PropsWithChildren

export const OptionsSelector = <T extends OptionType<unknown>>({
  selectedOptions,
  unSelectedOptions,
  search,
  onCreateOption,
  onSelectOption,
  onRemoveOption,
  onSearch,
  renderOption,
  removeSelectedOption,
  tagType,
  canCreateOptions,
  children,
  colorForCreation,
}: OptionSelectorType<T>) => {
  const [localSearch, setLocalSearch] = useState(search || '');

  const filteredOptions = useMemo(() => {
    return unSelectedOptions.filter((option) => {
      return !selectedOptions.find((opt) => opt.id === option.id) && option.label && option.label.toLowerCase().includes(localSearch.toLowerCase());
    });
  }, [localSearch, selectedOptions, unSelectedOptions]);

  const createOption = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onCreateOption && onCreateOption(localSearch);
    setLocalSearch('');
  }, [localSearch, onCreateOption]);

  const changeSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(event.target.value);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSearch && onSearch(event.target.value);
      // selectedListRef.current?.setHoverIndex(-1);
    },
    [onSearch],
  );

  const changeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
    case 'Enter': createOption();
      break;
    }
  };

  const renderSelectedOptions = useCallback((option: OptionType<T>) => {
    if(renderOption){
      return React.cloneElement(renderOption, {
        key: option.id,
        ...(renderOption.props || {}),
        onClose: () => removeSelectedOption && removeSelectedOption(option),
        onClick: () => onSelectOption && onSelectOption(option),
        option,
      });
    }
    return (
      <Tag
        key={option.id}
        label={option.label}
        onClose={() => removeSelectedOption && removeSelectedOption(option)}
        onClick={() => onSelectOption && onSelectOption(option)}
        color={option.color}
        type={tagType}
        size="xs"
        width={'fit-content'}
        closable
      />
    );
  }, [onSelectOption, removeSelectedOption, renderOption, tagType]);

  return (
    <Box>
      <Box>
        <Input
          autoFocus
          size={'sm'}
          marginBottom={2}
          value={localSearch}
          onChange={changeSearch}
          onKeyDown={changeKeyPress}
        />
      </Box>
      <Flex
        flexDirection={'column'}
        gap={1}
      >
        {unSelectedOptions.map(renderSelectedOptions)}
        {children}
        {canCreateOptions && localSearch ? (
          <Box onClick={() => createOption && createOption()}>
            <Text
              as={'span'}
              fontSize={'xs'}
              color={'text.pale'}
            >Create: </Text>
            {
              renderSelectedOptions({
                id: 'not-used',
                label: localSearch,
                color: colorForCreation,
              } as OptionType<T>)
            }
          </Box>
        ): null}
      </Flex>

    </Box>

  );
};
