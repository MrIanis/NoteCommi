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

  function AddNoteForm({ onNoteAdded }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
      setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch('/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      const newNote = await response.json();
      onNoteAdded(newNote);
      setTitle('');
      setContent('');
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Titre :
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Contenu :
          <textarea value={content} onChange={handleContentChange} />
        </label>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    );
  }

  return (
    <>
      <aside className="Side">
        <button onClick={() => setSelectedNote(null)}>Ajouter une note</button>
        {Array.isArray(notes) && notes.map((note) => (
          <div key={note.id}>
            <button><Link to={`/notes/${note.id}`} onClick={() => handleNoteClick(note)}>{note.title}</Link></button>
          </div>
        ))}
      </aside>
      <main className="Main">
        {selectedNote ? (
          <div>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
          </div>
        ) : (
          <AddNoteForm onNoteAdded={(newNote) => setNotes([...notes, newNote])} />
        )}
      </main>
    </>
  );
};

export default App;
