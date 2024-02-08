import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from './../store'
import { timeConstraint, difficulty } from '../../types';
import { TIME_OPTIONS, WORDS_OPTIONS } from '../../types/constants';

// Define a type for the slice state
interface AppSettingState {
  theme: string;
  constraint: timeConstraint;
  constraintLimit: number;
  difficulty: difficulty;
  modals: {
    settings: boolean,
    info: boolean,
    leaderBoard: boolean
  }
}

//initial theme settings
let theme = localStorage.getItem('theme');
if (theme) {
  document.documentElement.setAttribute('data-theme', theme);
} else {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkThemeMq.matches) {
    theme = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    theme = 'light';
    localStorage.setItem('theme', 'light');
  }
}

// initial settings of time constraint and limit
const initialConstraint =
  (localStorage.getItem('typing-constraint') as timeConstraint) || 'time';
const initialLimitStr = localStorage.getItem('constraint-limit');
let initialLimit = TIME_OPTIONS[0];
if (initialLimitStr) {
  initialLimit = parseInt(initialLimitStr);
}

// initial settings for difficulty
const difficultyLevel = localStorage.getItem('difficulty') as difficulty;

// Define the initial state using that type
const initialState: AppSettingState = {
  theme: theme,
  constraint: initialConstraint,
  constraintLimit: initialLimit,
  difficulty: difficultyLevel || 'easy',
  modals: {
    settings: false,
    info: false,
    leaderBoard: false
  }
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
      localStorage.setItem('typing-constraint', action.payload);
      localStorage.setItem('constraint-limit', limit.toString());
    },
    setConstraintLimit: (state, action: PayloadAction<number>) => {
      state.constraintLimit = action.payload;
      localStorage.setItem('constraint-limit', action.payload.toString());
    },
    setDifficulty: (
      state: AppSettingState,
      action: PayloadAction<difficulty>
    ) => {
      state.difficulty = action.payload;
      localStorage.setItem('difficulty', action.payload);
    },
    setModalVisibility: (state: AppSettingState, action: PayloadAction<{key: string, value: boolean}>) => {
      const oldModals = { ...state.modals };
      state.modals = { ...oldModals, ...{[action.payload.key]: action.payload.value} }
    }
  },
});

export const { setConstraint, setConstraintLimit, setTheme, setDifficulty, setModalVisibility } =
  appSettingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.appSetting.theme

export default appSettingSlice.reducer;
