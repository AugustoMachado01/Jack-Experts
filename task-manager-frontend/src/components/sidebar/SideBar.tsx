import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [img, setImg] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="img">
          {img ? (
            <img src="profile-picture-url" alt="Profile" />
          ) : (
            'AM'
          )}
        </div>
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
        Sair da Plataforma
      </button>
    </div>
  );
};

export default Sidebar;
