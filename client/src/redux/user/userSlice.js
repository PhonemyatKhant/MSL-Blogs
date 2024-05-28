import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSLice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateStart: (state) => {
            state.loading = true
            state.error = null
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        updateFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteStart: (state) => {
            state.loading = true
            state.error = null
        },
        deleteSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        deleteFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
        signOutSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, updateStart, updateFailure, updateSuccess, deleteStart, deleteSuccess, deleteFailure, clearError, signOutSuccess } = userSLice.actions
export default userSLice.reducer