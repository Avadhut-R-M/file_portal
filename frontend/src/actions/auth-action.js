import { USER_LOGIN, USER_LOGOUT, AuthReducer, SET_AUTH_MODE } from "../reducers/AuthReducer";
import { ADD_USER } from "../reducers/UserReducer";

export const login = (email, passward) => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')

        let options = {
            method : 'POST',
            body : JSON.stringify({'email': email, 'passward': passward}),
            headers
        }

        let url = 'http://127.0.0.1:8000/auth/login'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successlogin
        })
    }
}

export const successlogin = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: USER_LOGIN,
            payload: data || {}
        });
        dispatch(get_user())
    }
}

export const logout = (data) => {
    return (dispatch) => {
        dispatch({
            type: USER_LOGOUT,
            payload: data || {}
        })
    }
}

export const signup = (username, email, passward) => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')

        let options = {
            method : 'POST',
            body : JSON.stringify({'email': email, 'passward': passward, 'username': username}),
            headers
        }

        let url = 'http://127.0.0.1:8000/auth/signup'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successsignup
        })
    }
}

export const successsignup = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: SET_AUTH_MODE,
            payload: 'signin'
        })
    }
}

export const update_user = (username) => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', `Token ${state?.auth?.token}`)

        let options = {
            method : 'POST',
            body : JSON.stringify({'username': username,}),
            headers
        }

        let url = 'http://127.0.0.1:8000/auth/update_user'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successupdateuser
        })
    }
}

export const successupdateuser = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: ADD_USER,
            payload: data || {}
        })
    }
}

export const setAuthMode = (mode) => {
    return (dispatch) => {
        dispatch({
            type: SET_AUTH_MODE,
            payload: mode
        })
    }
}

export const get_user = () => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers({
            'Content-Type': 'application/json'
        })
        headers.append('Authorization', `Token ${state?.auth?.token}`)

        let options = {
            method : 'GET',
            headers,
        }

        let url = 'http://127.0.0.1:8000/auth/get_user'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successGetUser
        })
    }
}

const successGetUser = (data) => {
    return (dispatch) =>{
        dispatch({
            type: ADD_USER,
            payload: data
        })
    }
}