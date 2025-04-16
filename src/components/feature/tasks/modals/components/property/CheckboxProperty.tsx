import { Checkbox } from '@chakra-ui/react';
import React from 'react';

type Props = {
  value?: boolean
  onChenge?: (value: boolean) => void
  readOnly?: boolean
}

const CheckboxProperty = ({ value = false, readOnly, onChenge }: Props) => {
  return (
    <Checkbox
      isChecked={value}
      onChange={(e) => onChenge?.(e.target.checked)}
      isDisabled={readOnly}
    />
  );
};

export default CheckboxProperty;