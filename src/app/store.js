import { configureStore } from '@reduxjs/toolkit'

import storiesReducer from '../features/stories/storiesSlice'
import storyReducer from '../features/story/storySlice'
import commentsReducer from '../features/comments/commentsSlice'

const store = configureStore({
  reducer: {
    stories: storiesReducer,
    story: storyReducer,
    comments: commentsReducer,
  },
})

export default store
