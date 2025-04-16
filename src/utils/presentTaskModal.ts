import { CreateTask } from '@/store/task/task.slice';
import { TaskModel } from '@/types/course.type';

export default (task: TaskModel): CreateTask => {
  return {
    id: task.id,
    title: task.title,
    text: task.text,
    creatorId: task.creatorId as string,
    property: {
      group: task.assignment.groupId || null,
      semester: task.assignment.semesterId || null,
      endDate: task.endDate,
      startDate: task.startDate,
      priority: task.priority,
      tags: task.tags,
      score: task.score,
      isAnswered: task.isAnswered,
    },
    answer: null, // TODO присылать с бэка ответ на задание
  };
};