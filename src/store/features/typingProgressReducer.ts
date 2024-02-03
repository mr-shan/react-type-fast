import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type progress = 'over' | 'running'

interface TypingProgressState {
  currentWordIndex: number;
  currentCharIndex: number;
  startTime: number;
  endTime: number;
  testStatus: progress;
}

const initialState: TypingProgressState = {
  currentCharIndex: 0,
  currentWordIndex: 0,
  startTime: 0,
  endTime: 0,
  testStatus: 'over'
}

const typingProgressSlice = createSlice({
  initialState: initialState,
  name: 'typingProgress',
  reducers: {
    setCurrentWordIndex: (state: TypingProgressState, action: PayloadAction<number>) => {
      state.currentWordIndex = action.payload
    },
    setCurrentCharIndex: (state: TypingProgressState, action: PayloadAction<number>) => {
      state.currentCharIndex = action.payload
    },
    startTest: (state: TypingProgressState) => {
      state.startTime = Date.now();
      state.endTime = 0;
      state.testStatus = 'running';
      console.log("Test started");
    },
    endTest: (state: TypingProgressState) => {
      state.endTime = Date.now();
      state.testStatus = 'over';
      console.log("Test ended")
      console.log("Time taken:  ", (state.endTime - state.startTime) / 1000, 'seconds')
    },
    reset: (state: TypingProgressState) => {
      state.startTime = 0;
      state.endTime = 0;
      state.currentCharIndex = 0;
      state.currentWordIndex = 0;
      state.testStatus = 'over';
    }
  }
})

export const { setCurrentCharIndex, setCurrentWordIndex, startTest, endTest, reset } = typingProgressSlice.actions;


export default typingProgressSlice.reducer;