import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleLogin(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Please enter your email and password.');
      return;
    }

    // Demo login only; this is not secure authentication.
    localStorage.setItem('campusconnect-logged-in', 'true');
    const emailName = email.split('@')[0];
    const formattedName = emailName
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    localStorage.setItem('campusconnect-user', formattedName);
    navigate('/dashboard', { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-mark">✳</div>
        <span className="eyebrow">YOUR CAMPUS, YOUR COMMUNITY</span>
        <h1>Welcome <em>back.</em></h1>
        <p>Sign in to find your people and keep your favourite connections close.</p>

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-submit">
            Enter your campus <span>↗</span>
          </button>
        </form>

        <div className="login-note">A little closer to your campus community.</div>
      </section>
    </main>
  );
}
