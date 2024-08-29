import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import TaskList from "./components/Task/TaskList";
import TaskForm from "./components/Task/TaskForm";
import useTasks from "./hooks/useTasks";
import { Task } from "./interface/Task";

const App: React.FC = () => {
  const { tasks, setTasks } = useTasks();

  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <div>
              <TaskList tasks={tasks} setTasks={setTasks} />
              <TaskForm onAddTask={handleAddTask} />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
