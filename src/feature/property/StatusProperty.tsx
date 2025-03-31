import { Container } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropertyProps } from '.';
import { Multiselect } from '@/components/assets/ui/multiselect/Multiselect';
import { OptionType } from '@/components/assets/ui/multiselect/Option';
import { AppDispatch } from '@/store';
import { addOption } from '@/store/professorModule/course/course.thunk';

type StatusProperty = PropertyProps

const StatusProperty = ({ task, property }: StatusProperty) => {
  const dispatch = useDispatch<AppDispatch>();
  const [localValue, setLocalValue] = useState((task.values[property.id] || []) as string[]);

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
        tagType="withDot"
        onOptionsChange={setOptions}
        onChange={setLocalValue}
        selectionPlaceholder="Select option"
        propertyId={property.id}
      />
    </Container>
  );
};

export default StatusProperty;