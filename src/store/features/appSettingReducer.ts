import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from './../store'
import { timeConstraint, difficulty } from '../../types';
import { TIME_OPTIONS, WORDS_OPTIONS } from '../../types/constants';

// Define a type for the slice state
interface AppSettingState {
  theme: string;
  constraint: timeConstraint;
  constraintLimit: number;
  difficulty: difficulty
}

// Define the initial state using that type
const initialState: AppSettingState = {
  theme: 'dark',
  constraint: 'time',
  constraintLimit: TIME_OPTIONS[0],
  difficulty: 'easy'
};

export const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    setTheme: (state: AppSettingState, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setConstraint: (state, action: PayloadAction<timeConstraint>) => {
      const limit =
        action.payload === 'time' ? TIME_OPTIONS[0] : WORDS_OPTIONS[0];
      state.constraint = action.payload;
      state.constraintLimit = limit;
    },
    setConstraintLimit: (state, action: PayloadAction<number>) => {
      state.constraintLimit = action.payload;
    },
    setDifficulty: (state: AppSettingState, action: PayloadAction<difficulty>) => {
      state.difficulty = action.payload
    }
  },
});

export const { setConstraint, setConstraintLimit, setTheme, setDifficulty } =
  appSettingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.appSetting.theme

export default appSettingSlice.reducer;
