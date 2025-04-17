import { CreateTask } from '@/store/task/task.slice';

export default (professorId: string): CreateTask => {
  return {
    title: '',
    text: '',
    creatorId: professorId,
    property: {
      group: null,
      semester: null,
      endDate: null,
      startDate: null,
      priority: null,
      tags: null,
      score: null,
      isAnswered: false,
    },
    user_task: null,
  };
};