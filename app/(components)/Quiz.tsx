import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";
{
  /* <ThemeContext */
}
type Option = {
  id: number;
  text: string;
};

type QuizProps = {
  question: string;
  options: Option[];
  onSelectOption: (selectedOptionId: number) => void;
};
const Quiz: React.FC<QuizProps> = ({ question, options, onSelectOption }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`w-[60%] mx-auto bg-white rounded-lg shadow-lg p-6 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <h2 className="text-3xl text-gray-900 font-bold mb-4 font-serif">
        {question}
      </h2>
      <ul>
        {options.map((option) => (
          <li
            key={option.id}
            className="bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-lg p-2 mb-2 cursor-pointer"
            onClick={() => onSelectOption(option.id)}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
