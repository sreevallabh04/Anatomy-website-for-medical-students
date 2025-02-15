export type AnatomySystem = 'nervous' | 'circulatory' | 'muscular' | 'skeletal';

export interface BodyPart {
  id: string;
  name: string;
  description: string;
  system: AnatomySystem;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  children?: BodyPart[];
  functions?: string[];
  conditions?: Condition[];
}

export interface SystemInfo {
  id: AnatomySystem;
  name: string;
  description: string;
  color: string;
  facts: string[];
  parts: BodyPart[];
}

export interface Condition {
  name: string;
  description: string;
  symptoms: string[];
  treatments: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  system: AnatomySystem;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  completedQuizzes: string[];
  correctAnswers: number;
  totalAnswers: number;
  systemProgress: Record<AnatomySystem, number>;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface SearchResult {
  type: 'part' | 'system' | 'condition';
  item: BodyPart | SystemInfo | Condition;
  score: number;
}