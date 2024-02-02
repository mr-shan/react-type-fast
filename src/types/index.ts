export type timeConstraint = 'time' | 'words';
export type difficulty = 'easy' | 'hard'

export interface IconProps {
  height?: number;
  width?: number;
  color?: string;
  background?: string;
}

export interface TypingWord {
  index: number | string;
  original: string;
  typed: string;
  wrongChars: number;
  startTime: number;
  endTime: number;
  speed?: number;
}

export interface TypingResult {
  id: string;
  constraint: timeConstraint;
  constraintLimit: number;
  accuracy: number;
  grossSpeed: number;
  netSpeed: number;
  wrongWords: number;
}
