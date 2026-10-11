import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
const StudentContext = createContext(null);
const STORAGE_KEY = 'campusconnect-favourites-v1';

export const students = [
  { id: 101, name: 'Aarav Sharma', course: 'Computer Science', year: 'Final Year', initials: 'AS', color: 'violet', interests: ['UI design', 'Chess'], about: 'Curious builder who enjoys turning small ideas into useful products.' },
  { id: 102, name: 'Diya Kumar', course: 'Information Technology', year: 'Third Year', initials: 'DK', color: 'coral', interests: ['Photography', 'Music'], about: 'Collects little moments, big playlists, and interesting ideas.' },
  { id: 103, name: 'Rohan Patel', course: 'Artificial Intelligence', year: 'Final Year', initials: 'RP', color: 'mint', interests: ['Machine learning', 'Football'], about: 'Exploring how thoughtful AI can solve real-world problems.' },
  { id: 104, name: 'Ananya Rao', course: 'Data Science', year: 'Second Year', initials: 'AR', color: 'rose', interests: ['Reading', 'Analytics'], about: 'Loves finding patterns in data and stories in unexpected places.' },
  { id: 105, name: 'Ishaan Verma', course: 'Cyber Security', year: 'Third Year', initials: 'IV', color: 'sky', interests: ['CTF challenges', 'Gaming'], about: 'Security enthusiast who likes solving puzzles and breaking things safely.' },
  { id: 106, name: 'Meera Nair', course: 'Computer Science', year: 'Final Year', initials: 'MN', color: 'amber', interests: ['Robotics', 'Sketching'], about: 'A creative problem-solver who likes to mix technology and art.' },
  { id: 107, name: 'Kabir Singh', course: 'Cloud Computing', year: 'Second Year', initials: 'KS', color: 'blue', interests: ['Cloud labs', 'Travel'], about: 'Learning how reliable systems scale from a laptop to the world.' },
  { id: 108, name: 'Tara Iyer', course: 'Electronics', year: 'Third Year', initials: 'TI', color: 'lilac', interests: ['DIY projects', 'Dance'], about: 'Enjoys making things work, whether it is a circuit or a choreography.' },

  { id: 109, name: 'Nisha Kapoor', course: 'Software Engineering', year: 'Second Year', initials: 'NK', color: 'coral', interests: ['Web development', 'Painting'], about: 'Enjoys building clean digital experiences and exploring creative ideas.' },
  { id: 110, name: 'Arjun Menon', course: 'Information Technology', year: 'Final Year', initials: 'AM', color: 'mint', interests: ['App development', 'Badminton'], about: 'Passionate about creating useful applications and learning new frameworks.' },
  { id: 111, name: 'Sana Khan', course: 'Artificial Intelligence', year: 'Third Year', initials: 'SK', color: 'rose', interests: ['Deep learning', 'Writing'], about: 'Interested in intelligent systems and the ways technology can help people.' },
  { id: 112, name: 'Vivek Reddy', course: 'Mechanical Engineering', year: 'Second Year', initials: 'VR', color: 'sky', interests: ['3D printing', 'Automotive'], about: 'Loves experimenting with designs and understanding how machines work.' },
  { id: 113, name: 'Priya Das', course: 'Data Science', year: 'Final Year', initials: 'PD', color: 'amber', interests: ['Data visualisation', 'Travel'], about: 'Turns complex datasets into meaningful insights and engaging stories.' },
  { id: 114, name: 'Aditya Bose', course: 'Cyber Security', year: 'Third Year', initials: 'AB', color: 'blue', interests: ['Ethical hacking', 'Linux'], about: 'Enjoys solving security challenges and exploring how systems stay protected.' },
  { id: 115, name: 'Kavya Srinivasan', course: 'Computer Science', year: 'Second Year', initials: 'KS', color: 'lilac', interests: ['Open source', 'Photography'], about: 'Learning through side projects and capturing everyday details.' },
  { id: 116, name: 'Rahul Desai', course: 'Cloud Computing', year: 'Final Year', initials: 'RD', color: 'violet', interests: ['DevOps', 'Cricket'], about: 'Exploring cloud infrastructure and ways to make deployments more reliable.' },
  { id: 117, name: 'Zoya Fernandes', course: 'Information Technology', year: 'Third Year', initials: 'ZF', color: 'coral', interests: ['UI/UX design', 'Music'], about: 'Believes the best technology feels simple, intuitive, and enjoyable to use.' },
  { id: 118, name: 'Neil Thomas', course: 'Electronics', year: 'Second Year', initials: 'NT', color: 'mint', interests: ['Embedded systems', 'Cycling'], about: 'Enjoys connecting hardware and software to build practical projects.' },
  { id: 119, name: 'Aditi Chawla', course: 'Software Engineering', year: 'Final Year', initials: 'AC', color: 'rose', interests: ['Full-stack development', 'Reading'], about: 'Building end-to-end projects and learning how great products come together.' },
  { id: 120, name: 'Manav Joshi', course: 'Robotics', year: 'Third Year', initials: 'MJ', color: 'sky', interests: ['Automation', 'Football'], about: 'Interested in intelligent machines, automation, and hands-on engineering.' },

];

export function StudentProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const ids = JSON.parse(stored);
      return students.filter((student) => ids.includes(student.id));
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites.map((student) => student.id))); }
    catch { /* App still works if browser storage is unavailable. */ }
  }, [favourites]);

  const addFavourite = (student) => setFavourites((current) =>
    current.some((item) => item.id === student.id) ? current : [...current, student]
  );
  const removeFavourite = (id) => setFavourites((current) => current.filter((student) => student.id !== id));
  const isFavourite = (id) => favourites.some((student) => student.id === id);

  const value = useMemo(() => ({ favourites, addFavourite, removeFavourite, isFavourite, students }), [favourites]);
  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) throw new Error('useStudents must be used inside StudentProvider');
  return context;
}
