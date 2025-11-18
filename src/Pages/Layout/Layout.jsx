import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import BreadCrumbContext from '../../context/BreadCrumbContext'

export default function Layout() {
  const location = useLocation()
  const { updateBreadcrumbs, resetBreadcrumbs } = useContext(BreadCrumbContext)
const isLogin = localStorage.getItem("isLoggedIn")
  
  if (!isLogin && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  
  if (isLogin && location.pathname === "/") {
    return <Navigate to="/landingPage/home" replace />;
  }
  
  return <Outlet />;
}
