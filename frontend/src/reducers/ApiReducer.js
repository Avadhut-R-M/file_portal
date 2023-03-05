const API_LOADING = 'API_LOADING'
const API_SUCCESS = 'API_SUCCESS'
const API_FAIL = 'API_FAIL' 

const initialData = {
}

const ApiReducer = (state = initialData, action) => {
    switch(action.type){
        case API_LOADING:
            return {...state, [action?.payload?.api_name]:{
                'loading': true
            }}

        case API_FAIL:
            return {...state, [action?.payload?.api_name]:{
                'loading': false,
                'error': action?.payload?.error
            }}

        case API_SUCCESS:
            return {...state, [action?.payload?.api_name]:{
                'loading': false,
            }}

        default:
            return state
    }
}

export {
    API_LOADING,
    API_SUCCESS,
    API_FAIL,
    ApiReducer
}