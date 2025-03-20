/* eslint-disable max-len */
import { HStack, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import CourseTaskCard from './tasks/CourseTaskCard';
import Empty from '@/components/assets/ui/Empty';
import Labeled from '@/components/assets/ui/Labled';
import SelectUi from '@/components/assets/ui/SelectUi';
import { listGroups, listSemesters } from '@/services/assignment.service';

const TaskList = () => {
  const id = 'c772673d-907c-4bfa-8d93-fd9093e5bfdb';

  const [semesters, setSemesters] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchGroupList = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const semester_id = e.target.value;
    listGroups(id, semester_id).then((res) => setGroups(res.data));
  }, []);

  useEffect(() => {
    listSemesters(id).then((res) => setSemesters(res.data) );
  }, [id]);

  return (
    <VStack align={'start'}>

      <HStack
        w={'full'}
        justify={'space-between'}
        mb={3}
      >
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
      <Empty color="text.lighter">
        Здесь представлены задачи которые являются обязательными для прохождения курса. Если вы хотите увидеть задачи относящиеся к группе в контретном семестре используйте фильтр
      </Empty>
      <CourseTaskCard/>
    </VStack>
  );
};

export default TaskList;