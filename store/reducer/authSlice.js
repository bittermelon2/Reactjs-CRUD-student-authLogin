import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const token = localStorage.getItem('token')

        if (!token) {
            return {
                isLogged: false,
                token: null,
                user: null,
                expiredTime: 0 //expired time for login
            }
        }

        return {
            isLogged: true,
            token: token,
            user: JSON.parse(localStorage.getItem('user')), //transfer json to object
            expiredTime: +localStorage.getItem('expiredTime')
        }

    },
    reducers: {
        login(state, action) {
            state.isLogged = true
            state.token = action.payload.token
            state.user = action.payload.user

            //obtain current time
            const currentTime = Date.now()

            const timeout = 1000 * 60 * 60 //60 min

            //date for invalid 
            state.expiredTime = currentTime + timeout
            console.log('set 20s expired time in reducer')
            localStorage.setItem('expiredTime', state.expiredTime * 1)

            //save data to local storage
            localStorage.setItem('token', state.token)
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        logout(state, action) {
            state.isLogged = false
            state.token = null
            state.user = null

            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('expiredTime')
        }
    }
})

export const { login, logout } = authSlice.actions