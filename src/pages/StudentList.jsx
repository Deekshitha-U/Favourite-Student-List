import React from "react";
import { useMemo, useState } from 'react';
import StudentCard from '../components/StudentCard';
import { useStudents } from '../context/StudentContext';

export default function StudentList() {
  const { favourites, students } = useStudents();
  const [search, setSearch] = useState('');
  const [course, setCourse] = useState('All courses');
  const [sort, setSort] = useState('Recommended');
  const courses = ['All courses', ...new Set(students.map((student) => student.course))];
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const list = students.filter((student) =>
      (student.name.toLowerCase().includes(query) || String(student.id).includes(query) || student.course.toLowerCase().includes(query)) &&
      (course === 'All courses' || student.course === course)
    );
    if (sort === 'Name A–Z') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'Name Z–A') list.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'Course') list.sort((a, b) => a.course.localeCompare(b.course));
    return list;
  }, [search, course, sort, students]);

  return <main className="main-content">
    <section className="welcome-panel"><div className="welcome-copy"><span className="eyebrow"><i/> THE PEOPLE MAKE THE PLACE</span><h1>Your next great<br/>connection is <em>here.</em></h1><p>Meet your campus community, discover shared interests, and keep your favourite people close.</p><div className="welcome-bottom"><span className="mini-avatars"><i>AS</i><i>DK</i><i>RP</i><b>+5</b></span><span>Good things happen when we connect.</span></div></div><div className="welcome-art" aria-hidden="true"><div className="art-sun"/><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-note note-one">meet<br/>someone<br/><b>new ✳</b></div><div className="art-person person-one"><i>AS</i></div><div className="art-person person-two"><i>DK</i></div><div className="art-person person-three"><i>RP</i></div><div className="art-star star-one">✳</div><div className="art-star star-two">✦</div><div className="art-sticker">SAY<br/><b>HELLO!</b></div></div></section>
    <section className="stats-row"><div className="stat-card"><span className="stat-icon icon-violet">▦</span><div><span className="stat-label">CAMPUS DIRECTORY</span><strong>{String(students.length).padStart(2, '0')}<small> students</small></strong></div><span className="stat-decoration">↗</span></div><div className="stat-card"><span className="stat-icon icon-coral">♡</span><div><span className="stat-label">YOUR INNER CIRCLE</span><strong>{String(favourites.length).padStart(2, '0')}<small> saved</small></strong></div><span className="stat-decoration">✳</span></div><div className="stat-card stat-message"><span className="stat-icon icon-mint">✦</span><div><span className="stat-label">A LITTLE REMINDER</span><strong className="message-stat">Every friend starts<br/>as a stranger.</strong></div></div></section>
    <section className="directory-section"><div className="directory-heading"><div><span className="eyebrow">FIND YOUR PEOPLE</span><h2>The student directory<span className="heading-period">.</span></h2><p>Eight faces. Countless stories. Who will you add?</p></div><span className="directory-count"><b>{filtered.length.toString().padStart(2, '0')}</b> / {students.length} people</span></div>
      <div className="filter-bar"><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, course or ID..." aria-label="Search students"/>{search && <button onClick={() => setSearch('')} aria-label="Clear search">×</button>}</label><div className="filter-controls"><label className="select-wrap"><span>COURSE</span><select value={course} onChange={(event) => setCourse(event.target.value)}>{courses.map((item) => <option key={item}>{item}</option>)}</select></label><label className="select-wrap sort-select"><span>SORT BY</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Recommended</option><option>Name A–Z</option><option>Name Z–A</option><option>Course</option></select></label></div></div>
      {filtered.length ? <div className="student-grid">{filtered.map((student, index) => <StudentCard key={student.id} student={student} index={index}/>)}</div> : <div className="no-results"><span>⌕</span><h3>No students found</h3><p>Try another name or choose a different course filter.</p><button onClick={() => { setSearch(''); setCourse('All courses'); }}>Clear filters ↗</button></div>}
    </section>
  </main>;
}
