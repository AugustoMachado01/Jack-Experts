export interface Task {
  id: string | number;
  title: string;
  description: string;
}

export interface TaskFormProps {
  onAddTask: (task: Task) => void;
  taskToEdit?: Task;
}

export interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
