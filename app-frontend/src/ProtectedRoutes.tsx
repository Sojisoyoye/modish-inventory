import React, { Fragment } from "react";
import { Navigate,  Outlet } from "react-router-dom";
import Cookie from "universal-cookie";

const cookies = new Cookie();

const ProtectedRoute = () => {
  const token = cookies.get('TOKEN');

  return (
    <Fragment>
        {
            (token
                ? <Outlet /> : 
                  <Navigate to='/' replace />)
          }
    </Fragment>
  );
};

export default ProtectedRoute;