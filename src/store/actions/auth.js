import axios from "axios"
import { AUTH_SUCCESS } from "./actionTypes"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,password,
            returnSecureToken:true
            
        }
        try {
            let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJO3xZ0PHzhndClc2BNaH9BQ-i0VYlG50'
            if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJO3xZ0PHzhndClc2BNaH9BQ-i0VYlG50'
        }
                   const response=  await axios.post(url, authData)
            const data = response.data
                        const expirationDate = new Date(new Date().getTime()+data.expiresIn*1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            
            dispatch(authSuccess(data.idToken))


            
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}