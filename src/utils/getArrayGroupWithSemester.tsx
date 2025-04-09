import { OptionType } from '@/components/ui/multiselect/Option';

export const getArrayGroupWithSemester = (data: {group: Group, semesters: Semester[]}[]) => {
  const groups: OptionType[] = [];
  const newSemesters: Record<string, OptionType[]> = {};

  data.forEach((el) => {
    const { group, semesters } = el;

    // Добавляем группу
    groups.push({ id: group.id, label: group.groupCode, color: 'green' });

    // Инициализируем массив для группы, если его еще нет
    if (!newSemesters[group.id]) {
      newSemesters[group.id] = [];
    }

    // Добавляем уникальные семестры для группы
    semesters.forEach((s) => {
      if (!s) {return;}

      // Проверяем, нет ли уже такого семестра
      const isDuplicate = newSemesters[group.id].some(
        (existing) => existing.id === s.id,
      );

      if (!isDuplicate) {
        newSemesters[group.id].push({ id: s.id, label: s.name, color: 'cyan' });
      }
    });
  });

  return { groups, newSemesters };
};

type Group = {
  groupCode: string,
  id: string,
  universityId: string,
  degree: string,
  educationMode: string,
  course: number,
  groupNumber: number,
  isActive: boolean,
  created_at: Date,
  updated_at: Date,
  university_id: string
}

type Semester = {
  id: string
  name: string,
  startDate: string,
  endDate: string,
  createdAt: string,
  updatedAt: string
}