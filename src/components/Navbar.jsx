import React from "react";
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

export default function Navbar() {
  const { favourites } = useStudents();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('campusconnect-logged-in');
    localStorage.removeItem('campusconnect-user');
    navigate('/login', { replace: true });
  }
  const userName = localStorage.getItem('campusconnect-user') || 'Student';
  const initial = userName.charAt(0).toUpperCase();

  const pageNames = {
    '/dashboard': 'Dashboard',
    '/students': 'Student directory',
    '/favourites': 'My favourites',
  };

  const currentPage = pageNames[location.pathname] || 'Dashboard';

  return (
    <>
      <aside className="sidebar">
        <Link to="/dashboard" className="brand">
          <span className="brand-mark">✳</span>
          <span>
            campus<span className="brand-accent">connect</span>
          </span>
        </Link>

        <div className="side-label">YOUR SPACE</div>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `side-link ${isActive ? 'selected' : ''}`
          }
        >
          <span className="side-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) =>
            `side-link ${isActive ? 'selected' : ''}`
          }
        >
          <span className="side-icon">▦</span>
          <span>Student directory</span>
        </NavLink>

        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            `side-link ${isActive ? 'selected' : ''}`
          }
        >
          <span className="side-icon">♡</span>
          <span>My favourites</span>
          <span className="side-count">{favourites.length}</span>
        </NavLink>

        <div className="sidebar-note">
          <div className="doodle-star">✳</div>
          <p>
            Good people.<br />
            <em>Great connections.</em>
          </p>
          <span>✦ ─── ♡</span>
        </div>

        <div className="sidebar-bottom">
          <span className="online-dot" /> Your campus, closer.
        </div>
      </aside>

      <header className="topbar">
        <div className="mobile-brand">
          <span className="brand-mark">✳</span> campus
          <span className="brand-accent">connect</span>
        </div>

        <div className="crumb">
          <span>Workspace</span>
          <b>/</b>
          <strong>{currentPage}</strong>
        </div>

        <div className="topbar-right">
          <span className="date-chip">✦ &nbsp; MAKE A CONNECTION</span>

          <div className="profile-menu">
            <button type="button" className="profile-chip">
              <span className="profile-avatar">{initial}</span>
              <span>{userName}</span>
              <span className="profile-chevron">⌄</span>
            </button>

            <div className="profile-dropdown">
              <div className="dropdown-user">
                <strong>{userName}</strong>
                <span>Signed in to CampusConnect</span>
              </div>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                <span>↪</span> Log out
              </button>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
