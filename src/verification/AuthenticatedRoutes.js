import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function AuthenticatedRoutes({ element: Element, ...rest }) {
  const { user } = useContext(UserContext);
  let auth = {'token':false}
  return (
    auth.token ? <Outlet/> : <Navigate to="/Login"/>
  );
}

export default AuthenticatedRoutes;

