import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const confettiConfig = {
  maxParticles: 150,
  colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  duration: 3000,
  particleSize: 8,
  spread: 70
};

// Previous SVG components and questions array remain the same

const ModeratorTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = (optionIndex) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: optionIndex
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore(newAnswers);
      setShowResults(true);
    }
  };

  const calculateScore = (finalAnswers) => {
    const correct = Object.entries(finalAnswers).reduce((acc, [qIndex, answer]) => {
      return acc + (questions[parseInt(qIndex)].correctAnswer === answer ? 1 : 0);
    }, 0);
    setScore(correct);
    if (correct >= 30) {
      setShowConfetti(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <Confetti active={showConfetti} />
      
      <div className="text-center mb-8">
        <p className="text-xl text-blue-400">To pass this test, you need to score at least 30/35 correct answers.</p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Moderator Test [Beta]
        </h1>
        <ShieldIcon />
      </div>

      <div className="max-w-3xl mx-auto bg-slate-800 rounded-xl p-8 shadow-lg">
        {!showResults ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} / {questions.length}
            </h2>
            <p className="text-lg mb-6">
              {questions[currentQuestion].situation}
            </p>
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            <div className="text-6xl font-bold mb-4">
              {score} / {questions.length}
            </div>
            <p className="text-xl mb-4">
              {score >= 30 ? (
                <span className="text-green-400">Congratulations! You passed the test!</span>
              ) : (
                <span className="text-red-400">You did not reach the minimum required score.</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-2 bg-slate-800 p-2 rounded-lg shadow-lg">
        {Array.from({ length: questions.length }).map((_, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded-full border-2 ${
              answers[index] !== undefined
                ? answers[index] === questions[index].correctAnswer
                  ? 'bg-green-500 border-green-300'
                  : 'bg-red-500 border-red-300'
                : 'bg-slate-600 border-slate-400'
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-8 left-0 w-full">
        <div className="flex justify-center">
          <div className="flex items-center gap-3 bg-slate-800 px-6 py-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors">
            <DiscordIcon />
            <span className="text-blue-400 font-mono animate-pulse">get_ready_00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorTest;
