import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const result = await response.json();
    setNotes(result);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <aside className="Side">
        {Array.isArray(notes) && notes.map((note) => (
          <div key={note.id}>
            <button><Link to={`/notes/${note.id}`} onClick={() => handleNoteClick(note)}>{note.title}</Link>  </button>
          </div>
        ))}
      </aside>
      <main className="Main">
        {selectedNote && (
          <div>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default App;