import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";
const ModeChange: React.FC = () => {
  const { isDarkMode, toggleMode } = useContext(ThemeContext);

  const handleModeChange = () => {
    toggleMode();
    if (!isDarkMode) {
      // Apply dark mode styles
      document.documentElement.classList.add("dark");
    } else {
      // Remove dark mode styles
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      className={`fixed top-0 right-0 m-4 p-2 rounded-full ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-900"
      } hover:bg-gray-300 hover:text-gray-800 text-gray-800`}
      onClick={handleModeChange}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ModeChange;
