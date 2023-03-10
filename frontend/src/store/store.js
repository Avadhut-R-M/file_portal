import { configureStore } from '@reduxjs/toolkit'
import monitorReducerEnhancer from './enhancers/moniterReducer'
import { AuthReducer } from '../reducers/AuthReducer'
import { UserReducer } from '../reducers/UserReducer'
import { ApiReducer } from '../reducers/ApiReducer'
import { FileReducer } from '../reducers/FileReducer'
import thunk from 'redux-thunk'

const rootReducer = {
    'auth': AuthReducer,
    'user': UserReducer,
    'Api': ApiReducer,
    'portal': FileReducer
}


const actionHandler = store => next => action => {
  if(!action.hasOwnProperty("url")){
    return next(action)
  }
  if (action.type == 'API'){
    fetch(action.url, action.options)
      .then(resp =>{
        if(resp.ok){
          resp.json().then(data => {
            if ('successAction' in action)
              store.dispatch(action.successAction(data))
          })
        }

        else{
          resp.json().then(data => {
            if ('failureAction' in action)
              store.dispatch(action.failureAction(data))
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, actionHandler],
    preloadedState,
    enhancers: [monitorReducerEnhancer]
  })
  return store
}