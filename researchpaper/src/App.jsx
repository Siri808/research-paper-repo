import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';
import { AuthProvider } from './context/AuthContext';
import TeacherRoute from './Routes/TeacherRoutes'; // Ensure this implements <Outlet />
import TeacherLogin from './auth/TeacherLogin'
import AdminPrivateRoute from './Routes/AdminRoutes';
import AdminLogin from './auth/AdminLogin';
import Index from './index';
import StudentLogin from './auth/StudentLogin';
import StudentPrivateRoute from './Routes/StudentRoutes';
import StudentDashboard from './student/StudentDashboard';
import PublicResearchPapers from './PublicPapers';
import ViewResearchPaper from './ViewPaper';
import Profile from './teacher/Profile';
import PapersList from './teacher/PapersList';
import AddPaper from './teacher/AddPaper';
import StudentProfile from './student/SProfile';
import SPaperList from './student/SPapersList';
import SAddPapers from './student/SAddPaper';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route  */}
          <Route path="/teacher/login" element={<TeacherLogin/>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/student/login" element={<StudentLogin/>} />
          <Route path="/public/papers" element={<PublicResearchPapers/>} />
          <Route path="/paper/:paperId" element={<ViewResearchPaper/>} />

          <Route path="/" element={<Index/>} />


          {/* Protected Routes for Teacher */}
          <Route element={<TeacherRoute />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="papers" element={<PapersList />} />
          <Route path="addpaper" element={<AddPaper />} />
          <Route path="searchpaper" element={<PublicResearchPapers />} />
          <Route path="paper/:paperId" element={<ViewResearchPaper/>} />

          </Route>
          </Route>

          {/* Admin Routes  */}
            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route element={<StudentPrivateRoute/>}>
             <Route path="/student/dashboard" element={<StudentDashboard />}>
          <Route index element={<SPaperList />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="papers" element={<SPaperList/> } />
          <Route path="addpaper" element={<SAddPapers />} />
          <Route path="searchpaper" element={<PublicResearchPapers />} />
          <Route path="paper/:paperId" element={<ViewResearchPaper/>} />

          </Route>
            </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
