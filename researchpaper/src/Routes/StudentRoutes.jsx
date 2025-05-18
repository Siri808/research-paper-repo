import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const StudentPrivateRoute = () => {
  const { isLoggedIn, userRole } = useAuth();

  return isLoggedIn && userRole === 'student' ? <Outlet /> : <Navigate to="student/login" />;
};

export default StudentPrivateRoute;
