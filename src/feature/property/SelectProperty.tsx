import { isArray } from 'util';
import { Container } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyProps } from '.';
import { Multiselect } from '@/components/assets/ui/multiselect/Multiselect';
import { OptionType } from '@/components/assets/ui/multiselect/Option';
import { getGroupAndSemesterRequest } from '@/services/assignment.service';
import { AppDispatch, RootState } from '@/store';
import { addOption } from '@/store/professorModule/course/course.thunk';
import { getArrayGroupWithSemester } from '@/utils/getArrayGroupWithSemester';

export type SelectPropertyProps = {
  multiselect?: boolean;
} & PropertyProps;

const SelectProperty = ({ multiselect, property, task, onChange }: SelectPropertyProps) => {
  const { course } = useSelector((state: RootState) => state.courseStore);
  const dispatch = useDispatch<AppDispatch>();
  const [localValue, setLocalValue] = useState<string[]>(task.values[property.id] as string[] || []);
  const [options, setOptions] = useState<OptionType[]>(property.options as OptionType[]);

  const handleChange = useCallback((value: string[]) => {
    setLocalValue(value);
    onChange?.(value);
  }, [onChange]);

  const handleSetOptions = useCallback((options: OptionType[]) => {
    dispatch(addOption({ propertyId: property.id, options }));
  }, [dispatch, property.id]);

  useEffect(() => {
    setLocalValue(task.values[property.id] as string[] || []);
  }, [property, task.values]);

  useEffect(() => {
    const fetchOptions = async () => {
      if ((property.title === 'Группа' || property.title === 'Cеместер') && course) {
        try {
          const { data } = await getGroupAndSemesterRequest(course.id);
          const { groups, newSemesters } = getArrayGroupWithSemester(data);

          if (property.title === 'Группа') {
            setOptions(groups);
          } else if (property.title === 'Cеместер') {
            const propertyGroupId = course.properties.find((p) => p.title === 'Группа')?.id;
            if(!propertyGroupId) {
              setOptions([]);
              return;
            }
            const value = task.values[propertyGroupId];
            if(!value || !isArray(value)){
              setOptions([]);
              return;
            }
            setOptions(newSemesters[value[0] || ''] || []);
          }
        } catch (error) {
          console.error('Error fetching options:', error);
          setOptions(property.options as OptionType[]);
        }
      } else {
        setOptions(property.options as OptionType[]);
      }
    };

    fetchOptions();
  }, [course, course?.id, course?.properties, property.options, property.title, task.values]);


  return (
    <Container variant={'property_modal'}>
      <Multiselect
        value={localValue}
        options={(options || []) as OptionType[]}
        multiselect={multiselect}
        onOptionsChange={handleSetOptions}
        onChange={handleChange}
        selectionPlaceholder="Select"
        propertyId={property.id}
        canCreateOptions
      />
    </Container>
  );
};

export default SelectProperty;