import { Container } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropertyProps } from '.';
import { Multiselect } from '@/components/assets/ui/multiselect/Multiselect';
import { OptionType } from '@/components/assets/ui/multiselect/Option';
import { AppDispatch } from '@/store';
import { addOption } from '@/store/professorModule/course/course.thunk';

export type SelectPropertyProps = {
  multiselect?: boolean;
} & PropertyProps;

const SelectProperty = ({ multiselect, property, task }: SelectPropertyProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [localValue, setLocalValue] = useState<string[]>(task.values[property.id] as string[] || []);

  const handleChange = useCallback((value: string[]) => {
    setLocalValue(value);
  }, []);

  const setOptions = useCallback((options: OptionType[]) => {
    dispatch(addOption({ propertyId: property.id, options }));
  }, [dispatch, property.id]);


  useEffect(() => {
    setLocalValue(task.values[property.id] as string[] || []);
  }, [property, task.values]);

  return (
    <Container variant={'property_modal'}>
      <Multiselect
        value={localValue}
        options={(property.options || []) as OptionType[]}
        multiselect={multiselect}
        onOptionsChange={setOptions}
        onChange={handleChange}
        selectionPlaceholder="Select"
        propertyId={property.id}
        canCreateOptions
      />
    </Container>
  );
};

export default SelectProperty;