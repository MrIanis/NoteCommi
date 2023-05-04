import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
const {notes, setNotes} = useState([null]);
  const fetchNotes = async () => {
    const response = await fetch("/posts");
    const result = await response.json();
    setNotes(result);
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  console.log(notes);
  return (
    <>
      <aside className="Side">
        {notes && notes.map((note) => <span>{note.title}</span>)}
      </aside>
      <main className="Main"></main>
    </>

  );
};
export default App;