import { useState } from 'react';
import { FiTrash2, FiEdit, FiSave, FiX } from 'react-icons/fi';

const NoteItem = ({ note, deleteNote, updateNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleUpdate = () => {
    updateNote(note.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-blue-100 dark:hover:ring-blue-900/50">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{note.date}</span>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400"
              >
                <FiSave size={18} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              >
                <FiX size={18} />
              </button>
            </>
          ) : (
          <div className="relative">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiEdit size={20} />
            </button>
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Edit
            </span>
          </div>
          )}
          <div className="relative">
            <button
              onClick={() => deleteNote(note.id)}
              className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiTrash2 size={20} />
            </button>
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Delete
            </span>
          </div>
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full h-24 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      ) : (
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{note.text}</p>
      )}
    </div>
  );
};

export default NoteItem;
