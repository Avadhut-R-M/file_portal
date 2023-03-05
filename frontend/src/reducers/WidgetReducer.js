const ADD_WIDGET_LIST = 'ADD_WIDGET_LIST'

const initialData = {
}

const WidgetReducer = (state = initialData, action) => {
    switch(action.type){
        case ADD_WIDGET_LIST:
            return {...state, ...action.payload}

        default:
            return state
    }
}

export {
    WidgetReducer,
    ADD_WIDGET_LIST
}