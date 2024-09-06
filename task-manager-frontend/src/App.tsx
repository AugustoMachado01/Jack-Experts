import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import useTasks from "./hooks/useTasks";
import TaskContainer from "./components/TaskContainer/TaskContainer";
import AppLayout from "./page/AppLayout";

const App: React.FC = () => {
  const { tasks, setTasks } = useTasks();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tasks"
          element={
            <AppLayout>
              <TaskContainer tasks={tasks} setTasks={setTasks} />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
