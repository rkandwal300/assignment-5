 
import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'

// import { persistMiddleware } from './persistReduxMiddleware';

export const rootReducer = combineReducers({
 
    counter: counterReducer
    
});

// export const store = configureStore({
//   devTools: true,
//   reducer: reducers, 
//   // preloadedState: loadState(),
//    middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(persistMiddleware),
// });