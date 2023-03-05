const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'
const SET_AUTH_MODE = 'SET_AUTH_MODE'

const initialData = {
    is_loggedin : false,
    token : '',
    authmode: 'signin'
}

const AuthReducer = (state = initialData, action) => {
    switch(action.type){
        case USER_LOGIN:
            let token = action?.payload?.token || ''
            return {...state, is_loggedin : true, token : token}

        case USER_LOGOUT:
            return {...state, is_loggedin : false, token : ''}

        case SET_AUTH_MODE:
            return {...state, authmode: action.payload}

        default:
            return state
    }
}

export {
    USER_LOGIN,
    USER_LOGOUT,
    AuthReducer,
    SET_AUTH_MODE
}