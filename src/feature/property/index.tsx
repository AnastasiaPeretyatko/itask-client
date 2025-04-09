import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import propertyRegistry from './PropertyRegistry';
import { AppDispatch } from '@/store';
import { addValue } from '@/store/professorModule/course/course.thunk';
import { PropertyModel, PropertyValues, TaskModel } from '@/types/course.type';

export type PropertyProps = {
  property: PropertyModel;
  task: TaskModel;
  size?: 'xs' | 'sm' | 'md' | 'lg'
  onChange?: (value: PropertyValues) => void;
  mode?: 'viewProperty' | 'property';
  readOnly?: boolean
}

const Property = ({ task, property, ...props }: PropertyProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const onChangeHandler = useCallback((value: PropertyValues) => {
    dispatch(addValue({ taskId: task.id, propertyId: property.id, value }));
  }, [dispatch, property.id, task]);

  const rest = {
    ...props,
    task,
    property,
    onChange: onChangeHandler,
  };

  if (!property) {
    return <span></span>;
  }

  if (propertyRegistry[property.type]) {
    const Component = propertyRegistry[property.type].component;
    const extra = propertyRegistry[property.type].extraProps || {};

    return (
      <Component
        {...rest}
        {...extra}
      />
    );
  }

  return <span></span>;
};

export default Property;