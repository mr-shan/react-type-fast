export type timeConstraint = 'time' | 'words'

export interface IconProps {
  height?: number;
  width?: number;
  color?: string;
  background?: string;
}

export interface TypingWord {
  index: number
  original: string
  typed: string
  wrongChars: number
}