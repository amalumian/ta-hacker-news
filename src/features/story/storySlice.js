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
  },
  reducers: {
    cleanStory: (state) => {
      state.data = undefined
    },
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
      .addCase(fetchStory.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { cleanStory } = storySlice.actions
export { fetchStory }
export default storySlice.reducer
