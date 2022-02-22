import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  //const { getUserFromLocalStorage } = useContext(UserContext);
  // const [user] = useState(getUserFromLocalStorage());
  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
