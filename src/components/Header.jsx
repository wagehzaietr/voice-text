import { FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Voice Notes</h1>
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
