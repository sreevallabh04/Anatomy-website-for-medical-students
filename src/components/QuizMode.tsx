import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { quizQuestions } from '../data/quiz';
import { Brain, Heart, Award } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import type { QuizQuestion } from '../types';

const QuizMode = () => {
  const { activeSystem } = useStore();
  const { playSound } = useSound();
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const systemQuestions = quizQuestions.filter(q => q.system === activeSystem);

  const startQuiz = () => {
    const randomQuestion = systemQuestions[Math.floor(Math.random() * systemQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowExplanation(false);
    playSound('select');
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    playSound('select');

    if (currentQuestion && index === currentQuestion.correctAnswer) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    setScore(prev => ({ ...prev, total: prev.total + 1 }));
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/80 backdrop-blur-md p-8 rounded-lg border border-cyan-500/30 max-w-2xl w-full mx-4"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-cyan-500 mb-2">Anatomy Quiz</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center">
              <Brain className="w-5 h-5 text-cyan-500 mr-2" />
              <span>Nervous System</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-pink-500 mr-2" />
              <span>Circulatory System</span>
            </div>
          </div>
        </div>

        {!currentQuestion ? (
          <div className="text-center">
            <button
              onClick={startQuiz}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
            >
              Start Quiz
            </button>
            
            {score.total > 0 && (
              <div className="mt-4 flex justify-center items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Score: {score.correct}/{score.total}</span>
              </div>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    className={`w-full p-4 rounded-lg transition-colors ${
                      showExplanation
                        ? index === currentQuestion.correctAnswer
                          ? 'bg-green-500/20 border-green-500'
                          : index === selectedAnswer
                          ? 'bg-red-500/20 border-red-500'
                          : 'bg-gray-800/50'
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    } border ${
                      selectedAnswer === index ? 'border-cyan-500' : 'border-transparent'
                    }`}
                    disabled={showExplanation}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gray-800/50 rounded-lg"
                >
                  <h4 className="font-semibold text-cyan-500 mb-2">Explanation</h4>
                  <p>{currentQuestion.explanation}</p>
                  
                  <button
                    onClick={startQuiz}
                    className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
                  >
                    Next Question
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default QuizMode;