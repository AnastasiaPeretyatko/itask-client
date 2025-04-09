/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-leaked-render */
import { Container, List, ListItem, Tag, TagCloseButton, TagLabel, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { OptionType } from '@/components/ui/multiselect/Option';
import Popover from '@/components/ui/popover';
import { getGroupAndSemesterRequest } from '@/services/assignment.service';
import { RootState } from '@/store';
import { getArrayGroupWithSemester } from '@/utils/getArrayGroupWithSemester';

type Props = {
  value: OptionType | null
  groupId: string
  onChange: (value: OptionType) => void
  readOnly?: boolean
  onDelete?: () => void
}

const SemesterProperty = ({ value, onChange, readOnly, onDelete, groupId }: Props) => {
  const { course } = useSelector((state: RootState) => state.courseStore);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [options, setOptions] = useState<OptionType[]>([]);

  const fetchGroup = async() => {
    if(course){
      const { data } = await getGroupAndSemesterRequest(course.id);
      const { newSemesters } = getArrayGroupWithSemester(data);
      setOptions(newSemesters[groupId]);
    }
  };

  useEffect(() => {
    if(isOpen) {
      fetchGroup();
    }
  }, [isOpen]);

  return (
    <Popover
      isOpen={!readOnly && isOpen}
      onOpen={onOpen}
      onClose={onClose}
      width={'400px'}
      contentStyle={{ width: 'full' }}
      disclosureContent={
        <Container variant={'property_modal'}>
          {
            !value?.label ? (
              <Text
                size={'small'}
                color={'text.pale'}
              >Выберите семестр...</Text>
            ) : (
              <Tag onClick={(e) => e.stopPropagation()}>
                <TagLabel>{value.label}</TagLabel>
                {!readOnly && <TagCloseButton onClick={onDelete}/>}
              </Tag>
            )
          }
        </Container>
      }
    >
      <Container>
        <List>
          {
            options.map((option) => (
              <ListItem key={option.id} >
                <Tag
                  cursor={'pointer'}
                  onClick={() => {
                    onChange(option);
                    onClose();
                  }}
                >
                  {option.label}
                </Tag>
              </ListItem>
            ))
          }
        </List>
      </Container>
    </Popover>

  );
};

export default SemesterProperty;