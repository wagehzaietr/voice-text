import { useReducer, useEffect, useRef } from 'react';
import Header from '../components/Header';
import RecordingSection from '../components/RecordingSection';
import NoteList from '../components/NoteList';

const initialState = {
  isListening: false,
  notes: [],
  currentNote: '',
  darkMode: false,
  recognitionLang: 'en-US',
  translateEnabled: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_LISTENING':
      return { ...state, isListening: !state.isListening };
    case 'SET_CURRENT_NOTE':
      return { ...state, currentNote: action.payload };
    case 'ADD_NOTE':
      const newNotes = [...state.notes, action.payload];
      localStorage.setItem('voice-notes', JSON.stringify(newNotes));
      return { ...state, notes: newNotes, currentNote: '' };
    case 'UPDATE_NOTE':
      const updatedNotes = state.notes.map(note =>
        note.id === action.payload.id ? { ...note, text: action.payload.text } : note
      );
      localStorage.setItem('voice-notes', JSON.stringify(updatedNotes));
      return { ...state, notes: updatedNotes };
    case 'DELETE_NOTE':
      const filteredNotes = state.notes.filter(note => note.id !== action.payload);
      localStorage.setItem('voice-notes', JSON.stringify(filteredNotes));
      return { ...state, notes: filteredNotes };
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_DARK_MODE':
      return { ...state, darkMode: action.payload };
    case 'TOGGLE_TRANSLATION':
      return { ...state, translateEnabled: !state.translateEnabled };
    default:
      return state;
  }
}

export default function VoiceText() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in your browser');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      dispatch({ type: 'SET_CURRENT_NOTE', payload: state.currentNote + ' ' + transcript });
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      dispatch({ type: 'TOGGLE_LISTENING' });
    };

    const savedNotes = localStorage.getItem('voice-notes');
    if (savedNotes) {
      dispatch({ type: 'SET_NOTES', payload: JSON.parse(savedNotes) });
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch({ type: 'SET_DARK_MODE', payload: true });
    }
  }, []);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const toggleListening = () => {
    if (state.isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    dispatch({ type: 'TOGGLE_LISTENING' });
  };

  const translateText = async (text) => {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            source: state.recognitionLang.split('-')[0],
            target: state.recognitionLang.startsWith('ar') ? 'en' : 'ar',
            format: 'text'
          })
        }
      );
      
      if (!response.ok) throw new Error('Translation failed');
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  };

  const saveNote = async () => {
    if (!state.currentNote.trim()) return;
    
    let noteText = state.currentNote;
    
    if (state.translateEnabled) {
      noteText = await translateText(noteText);
    }
    dispatch({
      type: 'ADD_NOTE',
      payload: {
        id: Date.now(),
        text: noteText,
        date: new Date().toLocaleString(),
      },
    });
  };

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch({ type: 'DELETE_NOTE', payload: id });
    }
  };

  const updateNote = (id, text) => {
    dispatch({ type: 'UPDATE_NOTE', payload: { id, text } });
  };

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-xl shadow-lg transition-all duration-300">
        <Header 
          darkMode={state.darkMode} 
          setDarkMode={(value) => dispatch({ type: 'SET_DARK_MODE', payload: value })}
          recognitionLang={state.recognitionLang}
          setRecognitionLang={(value) => dispatch({ type: 'SET_RECOGNITION_LANG', payload: value })}
          translateEnabled={state.translateEnabled}
          setTranslateEnabled={() => dispatch({ type: 'TOGGLE_TRANSLATION' })}
        />
        <RecordingSection
          isListening={state.isListening}
          toggleListening={toggleListening}
          currentNote={state.currentNote}
          setCurrentNote={(value) => dispatch({ type: 'SET_CURRENT_NOTE', payload: value })}
          saveNote={saveNote}
        />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Your Notes</h2>
          <div className="space-y-4 bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            {state.notes.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                No notes yet - start recording to capture your thoughts!
              </div>
            ) : (
              <NoteList 
                notes={state.notes} 
                deleteNote={deleteNote} 
                updateNote={updateNote} 
                className="space-y-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
