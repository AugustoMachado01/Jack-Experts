// import React, { useState, useEffect } from "react";
// import styles from "./TaskForm.module.css";
// import { Task, TaskFormProps } from "../../interface/Task";

// const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, taskToEdit }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     if (taskToEdit) {
//       setTitle(taskToEdit.title);
//       setDescription(taskToEdit.description);
//     }
//   }, [taskToEdit]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newTask: Task = {
//       id: taskToEdit ? taskToEdit.id : new Date().toISOString(),
//       title,
//       description,
//     };

//     onAddTask(newTask);

//     setTitle("");
//     setDescription("");
//   };

//   return (
//     <form className={styles["task-form"]} onSubmit={handleSubmit}>
//       <h2>{taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}</h2>
//       <label>
//         Título:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Descrição:
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">{taskToEdit ? "Atualizar" : "Adicionar"}</button>
//     </form>
//   );
// };

// export default TaskForm;

import React, { useState } from "react";

// Defina a interface para as props do componente
interface TaskFormProps {
  onAddTask: (task: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
