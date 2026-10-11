import React from "react";
import { Link } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import { useStudents } from '../context/StudentContext';

export default function FavouriteStudents() {
  const { favourites } = useStudents();
  return <main className="main-content favourites-page"><section className="favourites-banner"><div><span className="eyebrow"><i/> YOUR PEOPLE, YOUR PICKS</span><h1>A collection of<br/><em>good humans.</em></h1><p>The people you save here are always just one click away.</p><div className="collection-count"><span>♡</span><b>{favourites.length}</b> {favourites.length === 1 ? 'person' : 'people'} in your circle</div></div><div className="favourite-art" aria-hidden="true"><div className="favourite-art-circle">♡</div><span className="float-heart heart-a">♥</span><span className="float-heart heart-b">✦</span><span className="art-caption">KEEP YOUR<br/><b>PEOPLE CLOSE</b></span><div className="art-tape"/></div></section>
    <section className="directory-section favourite-directory"><div className="directory-heading"><div><span className="eyebrow">THE INNER CIRCLE</span><h2>Your favourites<span className="heading-period">.</span></h2><p>A small list can hold a lot of good energy.</p></div><span className="directory-count"><b>{String(favourites.length).padStart(2, '0')}</b> saved</span></div>
      {favourites.length ? <div className="student-grid">{favourites.map((student, index) => <StudentCard key={student.id} student={student} index={index}/>)}</div> : <div className="empty-state"><div className="empty-illustration"><div className="empty-folder">♡</div><span className="empty-spark spark-a">✳</span><span className="empty-spark spark-b">✦</span><span className="empty-dash">↝</span></div><span className="eyebrow">A LITTLE ROOM FOR SOMEONE</span><h3>No favourite students <em>just yet.</em></h3><p>Your inner circle is waiting to happen. Head to the directory, find someone interesting, and tap the heart to save them here.</p><Link to="/" className="primary-link">Discover your people <span>↗</span></Link><div className="empty-footnote">NO RUSH. GOOD CONNECTIONS TAKE TIME.</div></div>}
    </section>
  </main>;
}
