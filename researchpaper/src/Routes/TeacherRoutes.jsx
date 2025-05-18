import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const PrivateRoute = () => {
  const { isLoggedIn, userRole } = useAuth();

  return isLoggedIn && userRole === 'teacher' ? <Outlet /> : <Navigate to="teacher/login" />;
};

export default PrivateRoute;
