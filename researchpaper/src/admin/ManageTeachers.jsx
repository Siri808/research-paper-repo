import React, { useState } from 'react';
import AddTeacher from './utils/AddTeachers';
import ViewTeachers from './utils/ViewTeachers';
import ApproveTeachers from './utils/ApproveTeachers';

const ManageTeachers = () => {
  const [activeComponent, setActiveComponent] = useState('view');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddTeacher />;
      case 'view':
        return <ViewTeachers />;
      case 'approve':
        return <ApproveTeachers />;
      default:
        return <ViewTeachers />;
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Manage Teachers</h2>

      {/* Buttons */}
      <div className="d-flex justify-content-center mb-4 gap-3">
        <button 
          className={`btn ${activeComponent === 'add' ? 'btn-primary' : 'btn-outline-primary'}`} 
          onClick={() => setActiveComponent('add')}
        >
          Add Teachers
        </button>
        <button 
          className={`btn ${activeComponent === 'view' ? 'btn-success' : 'btn-outline-success'}`} 
          onClick={() => setActiveComponent('view')}
        >
          View Teachers
        </button>
        <button 
          className={`btn ${activeComponent === 'approve' ? 'btn-warning' : 'btn-outline-warning'}`} 
          onClick={() => setActiveComponent('approve')}
        >
          Approve Teachers
        </button>
      </div>

      {/* Render dynamic component */}
      <div className="card p-4 shadow">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ManageTeachers;
