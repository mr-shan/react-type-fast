export type timeConstraint = 'time' | 'words'

export interface IconProps {
  height?: number;
  width?: number;
  color?: string;
  background?: string;
}

export interface TypingWord {
  index: number | string
  original: string
  typed: string
  wrongChars: number
  startTime: number
  endTime: number
}