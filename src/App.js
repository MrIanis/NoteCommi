import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const result = await response.json();
    setNotes(result);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleNoteDelete = async (noteId) => {
    await fetch("/notes/${noteId}", { method: "DELETE" });
    setNotes(notes.filter((note) => note.id !== noteId));
    setSelectedNote(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  function AddNoteForm({ onNoteAdded }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
      setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch("/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      const newNote = await response.json();
      onNoteAdded(newNote);
      setTitle("");
      setContent("");
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
        <div>
          <label>
            Rechercher :
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </label>
        </div>
        {Array.isArray(filteredNotes) &&
          filteredNotes.map((note) => (
            <div key={note.id}>
              <button>
                <Link
                  to={`/notes/${note.id}`}
                  onClick={() => handleNoteClick(note)}
                >
                  {note.title}
                </Link>
              </button>
              <button onClick={() => handleNoteDelete(note.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  width="24px"
                  height="24px"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41l5.59 5.59L5 17.59 6.41 19l5.59-5.59 5.59 5.59 1.41-1.41L13.41 12l5.59-5.59z" />
                </svg>
              </button>
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
          <AddNoteForm
            onNoteAdded={(newNote) => setNotes([...notes, newNote])}
          />
        )}
      </main>
    </>
  );
}

export default App;
