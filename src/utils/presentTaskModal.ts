import { CreateTask } from '@/store/task/task.slice';
import { DashboardTask } from '@/types/task.type';

export default (task: DashboardTask): CreateTask => {
  console.log(task);
  return {
    id: task.id,
    title: task.title,
    text: task.text,
    creatorId: task.creatorId as string,
    property: {
      group: task.assignment?.groupId || null,
      semester: task.assignment?.semesterId || null,
      endDate: task.endDate,
      startDate: task.startDate,
      priority: task.priority,
      tags: task.tags,
      score: task.score,
      isAnswered: task.isAnswered,
    },
    user_task: task.user_task,
  };
};