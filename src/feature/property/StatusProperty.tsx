import { useState } from 'react';
import { PropertyProps } from '.';
import Labeled from '@/components/assets/ui/Labled';
import Select from '@/components/assets/ui/multiselect/Select';
import Tag from '@/components/assets/ui/multiselect/Tag';

type StatusProperty = PropertyProps

const StatusProperty = ({ property }: StatusProperty) => {
  const [value, setValue] = useState(property.value);

  const options = [
    { name: 'To do', id: 'todo' },
    { name: 'In progress', id: 'in_progress' },
    { name: 'Done', id: 'done' },
  ];

  const onChangeOption = (option: { name: string; id: string }) => {
    setValue(option);
  };

  return (
    <Labeled
      label="Status"
      isModal
    >
      <Select
        localValue={value}
        options={options}
        renderItem={Tag}
        renderOption={Tag}
        onChange={onChangeOption}
      />
    </Labeled>
  );
};

export default StatusProperty;