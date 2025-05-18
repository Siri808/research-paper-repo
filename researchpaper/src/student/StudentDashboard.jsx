import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';

const StudentDashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column">
        <nav className="navbar navbar-dark px-4 bg-dark text-end">
          <span className="navbar-brand mb-0 h1 fs-4 fw-bold text-white "> Research Paper Repository</span>
        </nav>

        <div className="p-4" style={{ flex: 1, overflowY: 'auto', backgroundColor: '#eef2f5' }}>
          <div className="bg-white p-4 shadow-lg rounded animate__animated animate__fadeIn">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
