import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import API from '../../utils/api'

const fetchStory = createAsyncThunk('story/fetchStory', async (id) => {
  const { data: story } = await axios.get(API.ITEM(id))
  return story
})

const storySlice = createSlice({
  name: 'story',
  initialState: {
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStory.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.data = action.payload
      })
      .addCase(fetchStory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.error.message ?? 'Error loading story'
      })
  },
  selectors: {
    selectStory: (storyState) => storyState,
    selectStoryData: (storyState) => storyState.data,
  },
})

export { fetchStory }
export const { selectStory, selectStoryData } = storySlice.selectors
export default storySlice.reducer
