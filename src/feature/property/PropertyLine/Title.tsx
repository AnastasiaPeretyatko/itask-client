import { CheckIcon } from '@chakra-ui/icons';
import { Container, HStack, IconButton, Input, List, ListItem, Text, useDisclosure } from '@chakra-ui/react';
import { KeyboardEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropertyIcon from '../PropertyIcon';
import Popover from '@/components/assets/ui/popover';
import { AppDispatch } from '@/store';
import { setTitleProperty } from '@/store/professorModule/course/course.slice';
import { PropertyModel } from '@/types/course.type';

type Props = {
  property: PropertyModel
  onRemoveProperty?: (property: PropertyModel) => void;
}

const Title = ({ property }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(property.title || '');

  const onChangeTitle = useCallback(() => {
    dispatch(setTitleProperty({ property: { ...property, title } }));
    onClose();
  }, [property, title]);

  const onKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChangeTitle();
    }
  }, [onChangeTitle]);


  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      disclosureContent={
        <Container
          variant={'property_title'}
          onClick={onOpen}
        >
          <PropertyIcon type={property.type} />
          <Text >{property.title}</Text>
        </Container>
      }
    >
      <List variant={'property_list'}>
        <HStack mb={2}>
          <Input
            size={'sm'}
            borderColor={'input.outline'}
            borderRadius={'md'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={onKeyPress}
          />
          <IconButton
            aria-label="save"
            variant={'secondary'}
            size={'sm'}
            icon={<CheckIcon/>}
            onClick={onChangeTitle}
          />
        </HStack>
        <ListItem>Property visibility</ListItem>
        <ListItem>Удалить свойство</ListItem>
      </List>
    </Popover>
  );
};

export default Title;