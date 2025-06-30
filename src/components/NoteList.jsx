import { useState } from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, deleteNote, updateNote }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Your Notes</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>
      {filteredNotes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500 dark:text-gray-400">
          {notes.length === 0 ? 'No notes saved yet' : 'No notes match your search'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map(note => (
            <NoteItem key={note.id} note={note} deleteNote={deleteNote} updateNote={updateNote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
