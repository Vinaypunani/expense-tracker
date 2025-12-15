import React from 'react'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import ForgotPassword from './pages/Auth/ForgotPassword'
import OtpVerification from './pages/Auth/OtpVerification'
import ResetPassword from './pages/Auth/ResetPassword'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'
import Dashboard from './pages/Dashboard/Home'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />
          <Route path='/forgot-password' exact element={<ForgotPassword />} />
          <Route path='/otp-verify' exact element={<OtpVerification />} />
          <Route path='/reset-password' exact element={<ResetPassword />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
          <Route path='/income' exact element={<Income />} />
          <Route path='/expense' exact element={<Expense />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

const Root = () => {
  // check if user is authenticated
  const isAuthenticated = !!localStorage.getItem('token')

  // if user is authenticated, redirect to dashboard
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (

    // if user is not authenticated, redirect to login
    <Navigate to='/login' />
  )
}