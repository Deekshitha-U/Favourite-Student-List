import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './pages/StudentList';
import FavouriteStudents from './pages/FavouriteStudents';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { StudentProvider } from './context/StudentContext';

function ProtectedLayout({ children }) {
  const loggedIn =
    localStorage.getItem('campusconnect-logged-in') === 'true';

  if (!loggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="app-layout">
      <Navbar />
      <div className="page-frame">
        {children}
        <footer className="site-footer">
          <div className="footer-brand">
            <span className="brand-mark">✳</span> campus
            <span className="brand-accent">connect</span>
          </div>
          <span>Built for the people who make campus feel like home.</span>
          <span className="footer-year">STUDENT PROJECT · 2026</span>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          <Route path="/dashboard" element={
            <ProtectedLayout><Dashboard /></ProtectedLayout>
          } />

          <Route path="/students" element={
            <ProtectedLayout><StudentList /></ProtectedLayout>
          } />

          <Route path="/favourites" element={
            <ProtectedLayout><FavouriteStudents /></ProtectedLayout>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}
