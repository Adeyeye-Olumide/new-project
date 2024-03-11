import {compose, applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reducers'

const composedEnhancer = compose(applyMiddleware(logger))

export const store = createStore(rootReducer, undefined, composedEnhancer)