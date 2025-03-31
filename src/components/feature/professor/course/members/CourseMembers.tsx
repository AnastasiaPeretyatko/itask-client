import { HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import StudentTaskRow from '../tasks/StudentTaskRow';
import Labeled from '@/components/assets/ui/Labled';
import SearchInput from '@/components/assets/ui/SearchInput';
import SelectUi from '@/components/assets/ui/SelectUi';
import { listGroupsByCourse, listSemestersByCourse } from '@/services/assignment.service';

const CourseMembers = () => {
  const { query } = useRouter();
  const [semesters, setSemesters] = useState([]);
  const [groups, setGroups] = useState([]);

  const id = query.id as string;

  const fetchGroupList = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const semester_id = e.target.value;
    listGroupsByCourse(id, semester_id).then((res) => setGroups(res.data));
  }, [id]);

  useEffect(() => {
    if(!id) {return;}
    listSemestersByCourse(id).then((res) => setSemesters(res.data) );
  }, [id]);

  return (
    <>
      <HStack
        w={'full'}
        justify={'space-between'}
        mb={5}
      >
        <SearchInput
          size="sm"
          placeholder="Поиск..."
        />
        <HStack gap={5}>
          <Labeled
            label="Семестр"
            gap={3}
          >
            <SelectUi
              options={semesters}
              onChange={fetchGroupList}
              placeholder="Выберите семестр"
            />
          </Labeled>
          <Labeled
            label="Группа"
            gap={3}
          >
            <SelectUi
              options={groups}
              placeholder="Выберите группу"
            />
          </Labeled>
        </HStack>
      </HStack>
      <VStack gap={2}>
        <StudentTaskRow/>
        <StudentTaskRow/>
      </VStack>
    </>
  );
};

export default CourseMembers;