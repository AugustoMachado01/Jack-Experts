import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./TaskList.module.css";
import { Task } from "../../interface/Task";
import axios from "axios";

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onEditTask: (task: Task) => void;
  openModal: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, onEditTask, openModal }) => {
  const handleDelete = async (id: string | number) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.taskList}>
      {tasks.length === 0 ? (
        <div className={styles.NotTask}>
            <p>Nenhuma tarefa disponível. :(</p>
        </div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
              <div className={styles.taskActions}>
                <button
                  onClick={() => {
                    onEditTask(task);
                    openModal();
                  }}
                  className={`${styles.button} ${styles.editButton}`}
                >
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className={`${styles.button} ${styles.deleteButton}`}
                >
                  <FontAwesomeIcon icon={faTrashAlt} /> Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
