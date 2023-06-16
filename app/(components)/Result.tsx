import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

type ResultProps = {
  score: number;
};
const Result: React.FC<ResultProps> = ({ score }) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl text-gray-900 font-bold mb-4">Quiz Completed!</h2>
      <p className="text-xl text-gray-900 text-center">Your score: {score}</p>
    </div>
  );
};

export default Result;
