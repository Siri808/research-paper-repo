import React, { useState } from 'react';
import AddStudent from './utils/AddStudents.jsx';
import ViewStudents from './utils/ViewStudents';
import ApproveStudents from './utils/ApproveStudents';

const ManageStudents = () => {
  const [activeComponent, setActiveComponent] = useState('view');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddStudent />;
      case 'view':
        return <ViewStudents />;
      case 'approve':
        return <ApproveStudents />;
      default:
        return <ViewStudents />;
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Manage Students</h2>

      {/* Buttons */}
      <div className="d-flex justify-content-center mb-4 gap-3">
        <button 
          className={`btn ${activeComponent === 'add' ? 'btn-primary' : 'btn-outline-primary'}`} 
          onClick={() => setActiveComponent('add')}
        >
          Add Students
        </button>
        <button 
          className={`btn ${activeComponent === 'view' ? 'btn-success' : 'btn-outline-success'}`} 
          onClick={() => setActiveComponent('view')}
        >
          View Students
        </button>
        <button 
          className={`btn ${activeComponent === 'approve' ? 'btn-warning' : 'btn-outline-warning'}`} 
          onClick={() => setActiveComponent('approve')}
        >
          Approve Students
        </button>
      </div>

      {/* Render dynamic component */}
      <div className="card p-4 shadow">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ManageStudents;
