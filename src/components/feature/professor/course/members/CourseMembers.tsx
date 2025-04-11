import { HStack, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentTaskRow from '../tasks/StudentTaskRow';
import Labeled from '@/components/ui/Labled';
import SearchInput from '@/components/ui/SearchInput';
import SelectUi from '@/components/ui/SelectUi';
import { listGroupsByCourse, listSemestersByCourse } from '@/services/assignment.service';
import { AppDispatch, RootState } from '@/store';
import { getAllStudentsTaskByCourseThunk } from '@/store/professorModule/course/course.thunk';

const CourseMembers = () => {
  const { query } = useRouter();
  const { course, students } = useSelector((state:RootState) => state.courseStore);
  const [filter, setFilter] = useState({
    semesterId: '',
    groupId: '',
    professorId: '783cedb0-4146-4db2-8930-4f4a5e481f47',
  });
  const [semesters, setSemesters] = useState([]);
  const [groups, setGroups] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  const id = query.id as string;

  const fetchGroupList = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const semester_id = e.target.value;
    setFilter((prev) => ({ ...prev, semesterId: semester_id }));
    listGroupsByCourse(id, semester_id).then((res) => setGroups(res.data));
  }, [id]);

  const fetchStudentTask = useCallback(async() => {
    if(course){
      await dispatch(getAllStudentsTaskByCourseThunk({ id: course?.id, params: filter })).unwrap();
    }
  }, [course, filter]);

  useEffect(() => {
    if(!id) {return;}
    listSemestersByCourse(id).then((res) => setSemesters(res.data) );
  }, [id]);

  useEffect(() => {
    if(filter.semesterId && filter.groupId){
      fetchStudentTask();
    }
  }, [filter]);

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
              onChange={(e) => setFilter((prev) => ({ ...prev, groupId: e.target.value }))}
              placeholder="Выберите группу"
            />
          </Labeled>
        </HStack>
      </HStack>
      <VStack gap={2}>
        {
          students.map((s) => (
            <StudentTaskRow
              key={s.id}
              student={s}
            />
          ))
        }
      </VStack>
    </>
  );
};

export default CourseMembers;