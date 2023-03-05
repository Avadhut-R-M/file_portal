import { ADD_USER_DATA, ADD_FILE_DATA } from "../reducers/FileReducer"
import { get_user_files } from "./user-action"

export const get_user_data = () => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers({
            'Content-Type': 'application/json'
        })
        headers.append('Authorization', `Token ${state?.auth?.token}`)

        let options = {
            method : 'GET',
            headers
        }

        let url = 'http://127.0.0.1:8000/api/file/user_level_count'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successUserData
        })
    }
}

const successUserData = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: ADD_USER_DATA,
            payload: data || {}
        })
    }
}

export const get_file_data = (username='') => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers({
            'Content-Type': 'application/json'
        })
        headers.append('Authorization', `Token ${state?.auth?.token}`)

        let options = {
            method : 'GET',
            headers
        }

        let url = `http://127.0.0.1:8000/api/file/file_level_count?username=${username}`

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successFileData
        })
    }
}

const successFileData = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: ADD_FILE_DATA,
            payload: data || {}
        })
    }
}

export const add_file = (data) => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers({
        })
        headers.append('Authorization', `Token ${state?.auth?.token}`)

        let options = {
            method : 'POST',
            headers,
            body: data
        }

        let url = `http://127.0.0.1:8000/api/file/`

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successAddFile
        })
    }
}

const successAddFile = (data) =>{
    return (dispatch) => {
        dispatch(get_user_files())
    }
}

