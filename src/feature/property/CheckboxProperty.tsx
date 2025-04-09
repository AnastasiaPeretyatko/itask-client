import { Checkbox, Container } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { PropertyProps } from '.';

export type CheckboxFieldType = PropertyProps;

const CheckboxProperty = ({ task, property, onChange, mode }: CheckboxFieldType) => {
  const value = task.values[property.id];
  const [localValue, setLocalValue] = useState('0');
  const isModal = mode === 'property';

  const onClick = useCallback(() => {
    // if (readOnly) {
    //   return;
    // }
    if (localValue === '1') {
      setLocalValue('0');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange('0');
    } else {
      setLocalValue('1');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange('1');
    }
  }, [localValue, onChange]);

  useEffect(() => {
    if (value === 'true' || value === '1' || value === true) {
      setLocalValue('1');
    } else {
      setLocalValue('0');
    }
  }, [value]);

  return (
    <Container variant={isModal ? 'property_modal' : 'property_card'}>
      <Checkbox
        checked={localValue === '1'}
        onChange={onClick}
      />
    </Container>
  );
};

export default CheckboxProperty;