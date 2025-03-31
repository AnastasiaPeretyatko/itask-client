import React from 'react';
import { OptionType } from './Option';
import { TagProps } from './Tag';

export type OptionItemProps<T = undefined> = {
  option: OptionType<T>;
  tag?: TagProps;
  onClose?: () => void;
  onClick?: () => void;
};

const OptionItem = () => {
  return (
    <div>OptionItem</div>
  );
};

export default OptionItem;