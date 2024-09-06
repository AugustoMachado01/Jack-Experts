import React from "react";
import "./AppLayout.css";  // Importa o CSS do AppLayout
import Sidebar from "../components/sidebar/SideBar";
import Header from "../components/Header/header";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="main-content">
      <Sidebar />
      <div className="content">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
