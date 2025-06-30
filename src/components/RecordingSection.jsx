import { FiMic, FiPause, FiSave } from 'react-icons/fi';

const RecordingSection = ({ isListening, toggleListening, currentNote, setCurrentNote, saveNote }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {isListening ? 'Listening...' : 'Ready to record'}
        </h2>
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full flex items-center justify-center ${
            isListening
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {isListening ? <FiPause size={20} /> : <FiMic size={20} />}
        </button>
      </div>

      <div className="mb-4">
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          placeholder={isListening ? "Speak now..." : "Press mic to start recording or type your note here."}
          className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveNote}
          disabled={!currentNote.trim()}
          className={`px-4 py-2 rounded-lg flex items-center ${
            currentNote.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <FiSave className="mr-2" /> Save Note
        </button>
      </div>
    </div>
  );
};

export default RecordingSection;
