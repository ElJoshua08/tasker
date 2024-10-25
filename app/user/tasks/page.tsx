import { TasksList } from '@/components/tasks-list';

export default function TasksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-4">
      <TasksList />
    </main>
  );
}
