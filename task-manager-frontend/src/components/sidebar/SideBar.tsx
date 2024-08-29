import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redireciona para a página de login
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <img src="profile-picture-url" alt="Profile" />
        <h3>Augusto Machado</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/tasks/all"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              All Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks/important"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Important!
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks/completed"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Completed!
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks/do-it-now"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Do It Now
            </NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout} className="logout-button">
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
