import React, { useState } from 'react';
import Sidebar from './SideBar';
import ManageTeachers from './ManageTeachers';
import ManageStudents from './ManageStudents';
import ManageResearchPaper from './ManageResearchPapers';


const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('teachers');

  const renderContent = () => {
    switch (activeTab) {
      case 'teachers':
        return <ManageTeachers/>;
      case 'students':
        return <ManageStudents/>;
      case 'researchpapers':
        return <ManageResearchPaper/>;
      default:
        return <PapersList/>;
    }
  };

  return (
    <div className="d-flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;
