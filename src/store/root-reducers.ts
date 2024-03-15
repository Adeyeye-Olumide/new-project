import { combineReducers } from 'redux'
import { userReducer } from './user-reducer'
import { headerReducer } from './header-reducer'
import { bookingsReducer } from './bookings-reducer'
import { reviewsReducer } from './reviews-reducer'
import { roomsReducer } from './rooms-reducer'

export const rootReducer = combineReducers({
    currentUser: userReducer,
    header: headerReducer,
    bookings: bookingsReducer,
    reviews: reviewsReducer,
    rooms: roomsReducer,
})