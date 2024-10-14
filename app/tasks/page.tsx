import { TasksList } from '@/components/tasks-list';

export default function TasksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <TasksList />
    </main>
  );
}
