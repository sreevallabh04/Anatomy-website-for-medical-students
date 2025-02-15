import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Which part of the brain is responsible for balance and coordination?',
    options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Thalamus'],
    correctAnswer: 1,
    explanation: 'The cerebellum is responsible for maintaining balance, posture, and coordinating voluntary movements.',
    system: 'nervous',
    difficulty: 'medium'
  },
  {
    id: 'q2',
    question: 'How many chambers does the human heart have?',
    options: ['Two', 'Three', 'Four', 'Five'],
    correctAnswer: 2,
    explanation: 'The heart has four chambers: two atria (upper chambers) and two ventricles (lower chambers).',
    system: 'circulatory',
    difficulty: 'easy'
  }
];

export const achievements = [
  {
    id: 'first-quiz',
    name: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯'
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get all questions correct in a quiz',
    icon: '⭐'
  }
];