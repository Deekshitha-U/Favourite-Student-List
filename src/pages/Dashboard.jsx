import React from "react";
import { Link, Navigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';

export default function Dashboard() {
  const { students, favourites } = useStudents();
  const loggedIn =
    localStorage.getItem('campusconnect-logged-in') === 'true';

  if (!loggedIn) return <Navigate to="/login" replace />;

  const email = localStorage.getItem('campusconnect-user') || 'Student';
  const firstName = email.split('@')[0];

  return (
    <main className="main-content dashboard-page">
      <section className="dashboard-hero">
        <span className="eyebrow">✳ YOUR CAMPUS SPACE</span>
        <h1>Good to see you, <em>{firstName}.</em></h1>
        <p>Your next connection could start with a hello. Explore your community and save the people you’d love to know.</p>
        <Link to="/students" className="dashboard-cta">
          Explore student directory <span>↗</span>
        </Link>
        <div className="dashboard-orbit" aria-hidden="true">✳</div>
      </section>

      <section className="dashboard-stats">
        <article className="dashboard-stat">
          <span>◉</span>
          <p>COMMUNITY MEMBERS</p>
          <strong>{students.length.toString().padStart(2, '0')}</strong>
          <small>Students to discover</small>
        </article>
        <article className="dashboard-stat">
          <span>♡</span>
          <p>YOUR FAVOURITES</p>
          <strong>{favourites.length.toString().padStart(2, '0')}</strong>
          <small>People in your inner circle</small>
        </article>
      </section>

      <section className="dashboard-next">
        <div>
          <span className="eyebrow">WHERE TO NEXT?</span>
          <h2>Make this space yours.</h2>
          <p>Discover students, find shared interests, and create your own little campus circle.</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/students" className="dashboard-action">
            <span>⌕</span>
            <div><strong>Student directory</strong><small>Meet the community</small></div>
            <b>↗</b>
          </Link>
          <Link to="/favourites" className="dashboard-action">
            <span>♡</span>
            <div><strong>My favourites</strong><small>Your saved connections</small></div>
            <b>↗</b>
          </Link>
        </div>
      </section>
    </main>
  );
}
