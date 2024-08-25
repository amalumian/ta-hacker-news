import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import pLimit from 'p-limit'
import { createSlice } from '@reduxjs/toolkit'

import API from '@/common/utils/api'
import { PLIMIT_COUNT, STORIES_PER_PAGE } from '@/common/utils/constants'

const limit = pLimit(PLIMIT_COUNT)

const fetchStories = createAsyncThunk('stories/fetchStories', async ({ filterStories, page }) => {
  let fetchUrl

  switch (filterStories) {
    case 'top':
      fetchUrl = API.TOP_STORIES()
      break
    case 'best':
      fetchUrl = API.BEST_STORIES()
      break
    case 'new':
    default:
      fetchUrl = API.NEW_STORIES()
      break
  }

  const { data: storyIds } = await axios.get(fetchUrl)
  const limitedStoryIds = storyIds.slice(page * STORIES_PER_PAGE, (page + 1) * STORIES_PER_PAGE)
  const promises = limitedStoryIds.map((id) => limit(() => axios.get(API.ITEM(id))))
  const responses = await Promise.all(promises)

  return responses.map((response) => response.data)
})

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    error: null,
    page: 0,
    hasMore: true,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        const currentPage = action.meta.arg.page

        if (action.payload.length === 0) {
          state.hasMore = false
        }

        if (currentPage === 0) {
          state.data = action.payload
        } else {
          state.data = state.data.concat(action.payload)
        }

        state.page = currentPage
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.error.message ?? 'Error loading stories'
      })
  },
  selectors: {
    selectStories: (storiesState) => storiesState,
  },
})

export { fetchStories }
export const { selectStories } = storiesSlice.selectors
export default storiesSlice.reducer
