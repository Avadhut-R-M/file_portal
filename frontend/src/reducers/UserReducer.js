const ADD_USER = 'ADD_USER'
const ADD_FILES = 'ADD_FILES'
const ADD_ADDRESSES = 'ADD_ADDRESSES'
const ADD_ADDRESS = 'ADD_ADDRESS'

const initialData = {
    files: [],
    address: [],
    username: ''

}

const UserReducer = (state = initialData, action) => {
    switch(action.type){
        case ADD_USER:
            return {...state, ...action.payload?.data}

        case ADD_USER:
            return {...state, username: ''}

        case ADD_FILES:
            return {...state, files: action.payload}

        case ADD_ADDRESSES:
            return {...state, address: action.payload}
            
        case ADD_ADDRESS:
            return {...state, address: [...state.address, action.payload.data]}

        

        default:
            return state
    }
}

export {
    UserReducer,
    ADD_USER,
    ADD_FILES,
    ADD_ADDRESSES,
    ADD_ADDRESS
}