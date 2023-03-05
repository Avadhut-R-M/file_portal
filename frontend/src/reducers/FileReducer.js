const ADD_USER_DATA = 'ADD_USER_DATA'
const ADD_FILE_DATA = 'ADD_FILE_DATA'

const initialData = {
    users_data: [],
    files_data: []
}

const FileReducer = (state = initialData, action) => {
    switch(action.type){
        case ADD_USER_DATA:
            return {...state, users_data:{...action.payload}}

        case ADD_FILE_DATA:
            return {...state, files_data:{...action.payload}}

        default:
            return state
    }
}

export {
    FileReducer,
    ADD_USER_DATA,
    ADD_FILE_DATA
}