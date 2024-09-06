    import React from "react";
    import "./Header.css";  

    const Header: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/perfil";
    };

    return (
        <header className="header"> 
        <h1>Gestor de Tarefas</h1>
        <button onClick={handleLogout} className="profile-button">Ver Pefril</button>
        </header>
    );
    };

    export default Header;
