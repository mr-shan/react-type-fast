import { configureStore } from '@reduxjs/toolkit'

import appSettingReducer from './features/appSettingReducer'
import typingResultsReducer from './features/typingResultsReducer'

const store = configureStore({
  reducer: {
    appSetting: appSettingReducer,
    typingResults: typingResultsReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store