import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetch2, fetch3 } from '../helpers/fetch2'



export const createTodo = createAsyncThunk(
  'createtodo',
  async (body) => {
    const result = await fetch2('/createtodo', body)
    return result
  }
)


export const fetchTodo = createAsyncThunk(
  'fetchtodo',
  async () => {
    const result = await fetch3('/gettodos', 'get')
    // console.log(result, "result")
    return result
  }
)


export const deleteTodo = createAsyncThunk(
  'deletetodo',
  async (id) => {
    const result = await fetch3(`remove/${id}`, 'delete')
    return result
  }
)


const todoReducer = createSlice(
  {
    name: 'todo',
    initialState: {
      loading: false,
      data: [],
    },
    reducers: {

    },
    extraReducers: {
      [createTodo.fulfilled]: (state, action) => {
        console.log(action, "action")
        state.loading = false
        if (action.payload.message) state.data.push(action.payload.message)
      },
      [createTodo.pending]: (state, action) => {
        state.loading = true
      },
      [createTodo.rejected]: (state, action) => {
        state.loading = false
      },
      [fetchTodo.fulfilled]: (state, action) => {
        state.loading = false

        console.log(action.payload.message,)
        return action.payload.message
      },
      [fetchTodo.pending]: (state, action) => {
        state.loading = false
      },
      [fetchTodo.rejected]: (state, action) => {
        state.loading = false
      },
      [deleteTodo.fulfilled]: (state, action) => {
        const removeTodo = state.data.filter(item => {
          return item._id != actionpayload.message._id
        })
        return removeTodo
      }
    }
  }
)


export default todoReducer.reducer


