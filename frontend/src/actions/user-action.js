import { ADD_FILES, ADD_ADDRESS, ADD_ADDRESSES } from "../reducers/UserReducer";

export const get_user_files = () => {
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

        let url = 'http://127.0.0.1:8000/api/file'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successUserFiles
        })
    }
}

const successUserFiles = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: ADD_FILES,
            payload: data || []
        })
    }
}

export const get_user_addresses = () => {
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

        let url = 'http://127.0.0.1:8000/api/address'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successUserAddresses
        })
    }
}

const successUserAddresses = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: ADD_ADDRESSES,
            payload: data || []
        })
    }
}

export const add_user_addresses = (data) => {
    return (dispatch, getState) => {
        let state = getState()
        let headers = new Headers({
            'Content-Type': 'application/json'
        })
        headers.append('Authorization', `Token ${state?.auth?.token}`)

        let options = {
            method : 'POST',
            headers,
            body: JSON.stringify(data)
        }

        let url = 'http://127.0.0.1:8000/api/address/'

        dispatch({
            type: 'API',
            options: options,
            url: url,
            successAction: successAddUserAddresses
        })
    }
}

const successAddUserAddresses = (data) => {
    return (dispatch, getstate) =>{
        dispatch({
            type: ADD_ADDRESS,
            payload: data || []
        })
    }
}