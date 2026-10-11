import React from "react";
import { useStudents } from '../context/StudentContext';

export default function StudentCard({ student, index }) {
  const { addFavourite, removeFavourite, isFavourite } = useStudents();
  const saved = isFavourite(student.id);
  return <article className={`student-card card-${student.color}`} style={{ '--delay': `${index * 55}ms` }}>
    <div className="card-orbit" aria-hidden="true"/><div className="card-head"><span className="student-number">STUDENT / {String(student.id).padStart(3, '0')}</span>
      <button className={`heart-button ${saved ? 'heart-active' : ''}`} onClick={() => saved ? removeFavourite(student.id) : addFavourite(student)} aria-label={saved ? `Remove ${student.name} from favourites` : `Add ${student.name} to favourites`} title={saved ? 'Remove from favourites' : 'Add to favourites'}>{saved ? '♥' : '♡'}</button></div>
    <div className={`avatar avatar-${student.color}`}>{student.initials}<span className="avatar-spark">✦</span></div>
    <div className="student-info"><h3>{student.name}</h3><p>{student.course}</p></div>
    <div className="student-meta"><span className="year-pill">{student.year}</span><span className="id-pill">ID {student.id}</span></div>
    <p className="student-about">{student.about}</p>
    <div className="card-footer"><div className="interest-row">{student.interests.slice(0, 2).map((interest) => <span key={interest}>{interest}</span>)}</div>
      <button className={`save-button ${saved ? 'is-saved' : ''}`} onClick={() => saved ? removeFavourite(student.id) : addFavourite(student)}>{saved ? <><span>✓</span> In your circle</> : <><span>＋</span> Add to favourites</>}</button></div>
  </article>;
}
