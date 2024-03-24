import {compose, applyMiddleware, createStore } from 'redux'

import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { rootReducer } from './root-reducers'

import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['currentUser', 'reviews']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancer = compose(applyMiddleware(logger))

export const store = createStore(persistedReducer, undefined, composedEnhancer)

export const persistedStore = persistStore(store)