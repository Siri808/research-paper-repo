import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
      <h2 className="text-center mb-4">Admin Panel</h2>
      <ul className="nav flex-column">
        <li className={`nav-item mb-2 ${activeTab === 'teachers' ? 'bg-secondary rounded' : ''}`}>
          <button className="btn btn-dark w-100 text-start" onClick={() => setActiveTab('teachers')}>
            Manage Teachers
          </button>
        </li>
        <li className={`nav-item mb-2 ${activeTab === 'papers' ? 'bg-secondary rounded' : ''}`}>
          <button className="btn btn-dark w-100 text-start" onClick={() => setActiveTab('students')}>
            Manage Students
          </button>
        </li>
        <li className={`nav-item mb-2 ${activeTab === 'addpaper' ? 'bg-secondary rounded' : ''}`}>
          <button className="btn btn-dark w-100 text-start" onClick={() => setActiveTab('researchpapers')}>
            Manage Research Papers
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
