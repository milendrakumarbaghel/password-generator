import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from '../../api/axios'

export interface PasswordHistoryItem {
  id: number
  password: string
  description?: string | null
  createdAt: string
}

interface GeneratePayload {
  length: number
  includeUppercase: boolean
  includeNumbers: boolean
  includeSpecialChars: boolean
  description?: string
}

interface PasswordState {
  generated: string | null
  history: PasswordHistoryItem[]
  loading: boolean
  error: string | null
}

const initialState: PasswordState = {
  generated: null,
  history: [],
  loading: false,
  error: null,
}

export const generatePassword = createAsyncThunk(
  'password/generate',
  async (payload: GeneratePayload, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/password/generate', payload)
      return data as { password: string }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.error || 'Failed to generate password')
    }
  }
)

export const fetchHistory = createAsyncThunk(
  'password/history',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/password/history')
      return data as { history: PasswordHistoryItem[] }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.error || 'Failed to fetch history')
    }
  }
)

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    clearGenerated(state) {
      state.generated = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(generatePassword.fulfilled, (state, action: PayloadAction<{ password: string }>) => {
        state.loading = false
        state.generated = action.payload.password
      })
      .addCase(generatePassword.rejected, (state, action) => {
        state.loading = false
        state.error = String(action.payload || action.error.message)
      })
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHistory.fulfilled, (state, action: PayloadAction<{ history: PasswordHistoryItem[] }>) => {
        state.loading = false
        state.history = action.payload.history
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false
        state.error = String(action.payload || action.error.message)
      })
  },
})

export const { clearGenerated } = passwordSlice.actions
export default passwordSlice.reducer
