import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import pLimit from 'p-limit'

import API from '../../utils/api'
import updateTreeData from '../../utils/updateTreeData'
import { COMMENTS_PER_POST, PLIMIT_COUNT } from '../../utils/constants'

const limit = pLimit(PLIMIT_COUNT)

const fetchComments = createAsyncThunk('comments/fetchComments', async (ids) => {
  const promises = ids.slice(0, COMMENTS_PER_POST).map((id) => limit(() => axios.get(API.ITEM(id))))
  const responses = await Promise.all(promises)

  return responses.map((response) => response.data)
})

const fetchChildComments = createAsyncThunk('comments/fetchChildComments', async (id) => {
  const {
    data: { kids: ids },
  } = await axios.get(API.ITEM(id))
  const promises = ids.map((id) => limit(() => axios.get(API.ITEM(id))))
  const responses = await Promise.all(promises)

  return { data: responses.map((response) => response.data), id: id }
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    isChildLoading: false,
    isChildError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.data = action.payload
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(fetchChildComments.pending, (state) => {
        state.isChildLoading = true
        state.isChildError = false
      })
      .addCase(fetchChildComments.fulfilled, (state, action) => {
        const commentId = action.payload.id
        const rootComments = state.data ?? []
        const childrenComments = action.payload.data
        const updatedData = updateTreeData(rootComments, commentId, childrenComments)

        state.data = updatedData
        state.isChildLoading = false
        state.isChildError = false
      })
      .addCase(fetchChildComments.rejected, (state) => {
        state.isChildLoading = false
        state.isChildError = true
      })
  },
  selectors: {
    selectComments: (commentsState) => commentsState,
  },
})

export { fetchComments, fetchChildComments }
export const { selectComments } = commentsSlice.selectors
export const { cleanComments } = commentsSlice.actions
export default commentsSlice.reducer
