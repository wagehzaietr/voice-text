import { FiSun, FiMoon, FiGlobe } from 'react-icons/fi';

const Header = ({ darkMode, setDarkMode, recognitionLang, setRecognitionLang, translateEnabled, setTranslateEnabled }) => {
  return (
    <header className="flex justify-between items-center mb-8 gap-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Voice Notes</h1>

      <button
        onClick={setTranslateEnabled}
        className={`p-2 rounded-full ${
          translateEnabled 
            ? 'text-green-500 bg-green-100 dark:bg-green-900/50' 
            : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        aria-label="Toggle translation"
      >
        <FiGlobe size={20} />
      </button>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>
    </header>
  );
};

export default Header;
