import {compose, applyMiddleware, createStore } from 'redux'

import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { rootReducer } from './root-reducers'

import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import { Logger } from 'sass'



// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['currentUser']
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const composedEnhancer = compose(applyMiddleware(logger))
export type x =  ()=> ([any])
export type Rootstate = ReturnType<typeof rootReducer>


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

// export const persistedStore = persistStore(store) 