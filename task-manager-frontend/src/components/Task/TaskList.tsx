// // src/components/Task/TaskList.tsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import TaskForm from "./TaskForm";
// import { useNavigate } from "react-router-dom";

// interface Task {
//   id: string;
//   title: string;
//   description: string;
// }

// interface TaskListProps {
//   tasks: Task[];
//   setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
//   const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:3000/tasks/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(tasks.filter((task) => task.id !== id));
//       alert("Tarefa excluída com sucesso");
//     } catch (error) {
//       console.error(error);
//       alert("Erro ao excluir tarefa");
//     }
//   };

//   return (
//     <div>
//       <h2>Tarefas</h2>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {task.title} - {task.description}
//             <button onClick={() => handleDelete(task.id)}>Excluir</button>
//             <button onClick={() => setTaskToEdit(task)}>Editar</button>
//           </li>
//         ))}
//       </ul>
//       {taskToEdit && (
//         <TaskForm
//           taskToEdit={taskToEdit}
//           onAddTask={(updatedTask) => {
//             setTasks(
//               tasks.map((task) =>
//                 task.id === updatedTask.id ? updatedTask : task
//               )
//             );
//             setTaskToEdit(null);
//           }}
//         />
//       )}
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default TaskList;

// src/components/Task/TaskList.tsx

import React, { useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import axios from "axios";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";
import { Task, TaskListProps } from "../../interface/Task";

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    // Carregar as tarefas do usuário
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        }
      }
    };

    fetchTasks();
  }, [navigate, setTasks]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
      alert("Tarefa excluída com sucesso");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir tarefa");
    }
  };

  return (
    <div className={styles["task-list"]}>
      <h2>Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => handleDelete(task.id)}>Excluir</button>
            <button onClick={() => setTaskToEdit(task)}>Editar</button>
          </li>
        ))}
      </ul>
      {taskToEdit && (
        <TaskForm
          taskToEdit={taskToEdit}
          onAddTask={(updatedTask) => {
            setTasks(
              tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              )
            );
            setTaskToEdit(null);
          }}
        />
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TaskList;
