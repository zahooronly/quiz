"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./(components)/Layout";
import Quiz from "./(components)/Quiz";
import Result from "./(components)/Result";
import ModeChange from "./(components)/ModeChange";
import ThemeContext, { ThemeProvider } from "./(components)/ThemeContext";

type Option = {
  id: number;
  text: string;
};

type Question = {
  question: string;
  options: Option[];
  correctOptionId: number;
};

type QuizData = {
  results: Question[];
};

const HomePage: React.FC = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [score, setScore] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizData>(
          // "https://opentdb.com/api.php?amount=10&category=18&difficulty=hard"
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy"
        );
        setQuizData(transformApiResponse(response.data));
      } catch (error) {
        console.log("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, []);

  const transformApiResponse = (apiData: any): QuizData => {
    return {
      results: apiData.results.map((questionData: any, index: number) => {
        const options: Option[] = [
          ...questionData.incorrect_answers.map(
            (option: string, index: number) => ({
              id: index,
              text: option,
            })
          ),
          {
            id: questionData.incorrect_answers.length,
            text: questionData.correct_answer,
          },
        ];

        return {
          question: questionData.question,
          options,
          correctOptionId: questionData.incorrect_answers.length,
        };
      }),
    };
  };

  const handleSelectOption = (selectedOptionId: number) => {
    if (!quizData) {
      console.log("Quiz data is not available.");
      return;
    }

    const currentQuestion = quizData.results[currentQuestionIndex];

    if (!currentQuestion || !currentQuestion.options) {
      console.log("Invalid question data.");
      return;
    }

    const isCorrect = currentQuestion.correctOptionId === selectedOptionId;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex >= quizData.results.length) {
      setIsQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handleStartNewQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
  };

  return (
    <ThemeProvider>
      <Layout title="Quiz App">
        {/* <ModeChange /> */}
        <div className="bg-gray-900 text-white text-center ml-[40%] items-center absolute z-50">
          <h1 className="bg-gray-900 text-white text-6xl">Quiz App</h1>
          <h1 className="bg-gray-900 text-white items-center m-1">
            Beginner Level Computer Science
          </h1>
        </div>
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
          {quizData ? (
            <>
              {!isQuizCompleted ? (
                <Quiz
                  question={quizData.results[currentQuestionIndex].question}
                  options={quizData.results[currentQuestionIndex].options}
                  onSelectOption={handleSelectOption}
                />
              ) : (
                <>
                  <Result score={score} />
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mt-4 rounded"
                    onClick={handleStartNewQuiz}
                  >
                    Start New Quiz
                  </button>
                </>
              )}
            </>
          ) : (
            <p className="text-xl">Loading quiz data...</p>
          )}
        </div>
      </Layout>
    </ThemeProvider>
  );
};

export default HomePage;
