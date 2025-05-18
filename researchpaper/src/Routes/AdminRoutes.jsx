import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path if needed

const AdminPrivateRoute = () => {
  const { isLoggedIn, userRole } = useAuth();

  return isLoggedIn && userRole === 'admin' ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
