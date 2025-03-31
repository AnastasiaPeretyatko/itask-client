import { useDisclosure, useTheme, WithCSSVar } from '@chakra-ui/react';
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '../popover';
import { OptionType } from './Option';
import { OptionItemProps } from './OptionItem';
import { OptionsSelector } from './OptionsSelector';
import { SelectedOptions } from './SelectedOptions';
import { TagType } from './Tag';
import { AppDispatch } from '@/store';
import { addOption } from '@/store/professorModule/course/course.thunk';


export type RenderOptionType<T> = React.ReactElement<OptionItemProps<T>>;

export type RenderItemType<T> = React.ReactElement<OptionItemProps<T>>;

type MultiselectProps<T> = {
  multiselect?: boolean;
  value: string[];
  options: OptionType<T>[];
  renderOption?: RenderOptionType<T>;
  renderItem?: RenderItemType<T>;
  tagType?: TagType;
  selectionPlaceholder?: string;
  onChange?: (options: string[]) => void;
  onOptionsChange?: (options: OptionType<T>[]) => void;
  search?: string;
  onSearch?: (term: string) => void;
  canCreateOptions?: boolean;
  propertyId: string;
} & PropsWithChildren;

export const Multiselect = React.memo(<T extends OptionType<unknown>>({
  multiselect,
  options,
  value,
  renderItem,
  renderOption,
  selectionPlaceholder,
  tagType,
  children,
  onChange,
  onOptionsChange,
  onSearch,
  search,
  canCreateOptions,
  propertyId,
}: MultiselectProps<T>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const theme = useTheme();
  const initialFocusRef = React.useRef<HTMLDivElement>(null);

  const [nextColor, setNextColor] = useState<string | null>(getNextColor(options, theme));

  const [selectedOptions, unSelectedOptions] = useMemo(() => {
    const uniq = new Map();

    const selectedOption = [];
    const unSelectedOption = [];

    for (let i = 0; i < (options ? options.length : 0); i++) {
      if (uniq.has(options[i].id)) {
        continue;
      }

      uniq.set(options[i].id, options[i]);

      if (value?.includes(options[i].id)) {
        selectedOption.push(options[i]);
      } else {
        unSelectedOption.push(options[i]);
      }
    }

    return [[...selectedOption], [...unSelectedOption]];
  }, [options, value]);

  const onSelectOption = useCallback((option: OptionType<T>) => {
    if(onChange){
      const options = new Set((multiselect ? [...selectedOptions, option] : [option]).map((opt) => opt.id));
      onChange([...options.values()]);
    }
  }, [multiselect, onChange, selectedOptions]);

  const createOption = useCallback((label: string) => {
    dispatch(addOption({ propertyId, option: { label, color: nextColor } }))
      .then(({ payload }) =>{
        const { newOption } = payload;

        if(onOptionsChange){
          onOptionsChange([...options, newOption]);
        }

        if(onSelectOption){
          onSelectOption(newOption);
        }

        setNextColor(getNextColor(options, theme));
      });
  }, [dispatch, nextColor, onOptionsChange, onSelectOption, options, propertyId, theme]);

  const optionsChange = useCallback(
    (newOptions: OptionType<T>[]) => {
      if (!onOptionsChange) {
        return;
      }
      const reordered: OptionType<T>[] = [];
      for (const newOption of newOptions) {
        let oldOption = options.find((op) => op.id === newOption.id);
        if (!oldOption) {
          continue;
        }
        oldOption = { ...oldOption, ...newOption };
        reordered.push(oldOption);
      }
      for (const option of options) {
        if (!reordered.find((op) => op.id === option.id)) {
          reordered.unshift(option);
        }
      }

      onOptionsChange(reordered);
    },
    [onOptionsChange, options],
  );

  const onRemoveOption = useCallback((option: OptionType<T>) => {
    if (!onOptionsChange) {
      return;
    }
    const index = options.findIndex((op) => op.id === option.id);
    if (index === -1) {
      return;
    }
    options.splice(index, 1);
    const indexInValue = value.findIndex((op) => op === option.id);
    if(indexInValue !== -1){
      value.splice(indexInValue, 1);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange([...value]);
    }
    onOptionsChange([...options]);
  }, [onChange, onOptionsChange, options, value]);

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom-start"
      initialFocusRef={initialFocusRef}
      disclosureContent={
        <SelectedOptions
          options={selectedOptions}
          renderOption={renderOption}
          tagType={tagType}
          selectionPlaceholder={selectionPlaceholder}
          onClick={onOpen}
        />
      }
    >
      <OptionsSelector<T>
        selectedOptions={selectedOptions}
        unSelectedOptions={unSelectedOptions}
        onOptionsChange={optionsChange}
        onCreateOption={createOption}
        onSelectOption={onSelectOption}
        onRemoveOption={onRemoveOption}
        renderOption={renderOption}
        renderItem={renderItem}
        search={search}
        onSearch={onSearch}
        canCreateOptions={canCreateOptions}
        colorForCreation={nextColor}
      >
        {children}
      </OptionsSelector>
    </Popover>
  );
});

function getNextColor<T,>(options: OptionType<T>[], theme: WithCSSVar<Dict>) {
  const lastColor = options.length ? options[options.length - 1].color : null;

  const colorsForChoice = Object.entries(theme.colors.tagColors)
    .filter(([colorName, hex]) => {
      if (!lastColor) {
        return true;
      } else if (lastColor[0] === '#') {
        return hex !== lastColor;
      } else {
        return colorName !== lastColor;
      }
    })
    .map(([colorName]) => colorName);

  return colorsForChoice[Math.floor(Math.random() * colorsForChoice.length)];
}