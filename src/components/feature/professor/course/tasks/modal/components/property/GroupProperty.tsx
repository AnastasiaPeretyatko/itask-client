/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-leaked-render */
import { Container, List, ListItem, Tag, TagCloseButton, TagLabel, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Popover from '@/components/ui/popover';
import { getGroupAndSemesterRequest } from '@/services/assignment.service';
import { RootState } from '@/store';
import { OptionType } from '@/types/course.type';
import { getArrayGroupWithSemester } from '@/utils/getArrayGroupWithSemester';

type Props = {
  value: OptionType | null | string
  onChange: (value: OptionType) => void
  readOnly?: boolean
  onDelete?: () => void
}

const GroupProperty = ({ value, onChange, readOnly, onDelete }: Props) => {
  const { course } = useSelector((state: RootState) => state.courseStore);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [data, setData] = useState<OptionType | string>();

  const fetchGroup = async() => {
    if(course){
      const { data } = await getGroupAndSemesterRequest(course.id);
      const { groups } = getArrayGroupWithSemester(data);
      if(typeof(value) === 'string'){
        onChange(groups.find((group) => group.id === value));
        setData(groups.find((group) => group.id === value));
      }
      setOptions(groups);
    }
  };

  useEffect(() => {
    if(readOnly || isOpen) {
      fetchGroup();
    }
  }, [isOpen, readOnly]);

  if(typeof(data) === 'string' && !data){
    return null;
  }

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
            !data?.label ? (
              <Text
                size={'small'}
                color={'text.pale'}
              >Выберите группу...</Text>
            ) : (
              <Tag onClick={(e) => e.stopPropagation()}>
                <TagLabel>{data?.label}</TagLabel>
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
            !readOnly && options.map((option) => (
              <ListItem key={option.id} >
                <Tag
                  cursor={'pointer'}
                  onClick={() => {
                    onChange(option);
                    setData(option);
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

export default GroupProperty;