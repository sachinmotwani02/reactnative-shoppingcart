// // store.js
// // import { createStore, applyMiddleware } from 'redux';
// // import thunk from 'redux-thunk';
// // import cartReducer from './reducers/cartReducer';

// // const initialState = {};

// // const store = createStore(cartReducer, initialState, applyMiddleware(thunk));

// // export default store;

// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import cartReducer from './reducers/cartReducer';
// import reduxPromise from 'redux-promise';
// import { createSlice, configureStore } from '@reduxjs/toolkit';

// //code to setup redux dev tools
// // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// // const middleware = [thunk];

// // const store = createStore(cartReducer, applyMiddleware(...middleware));\

// // const middleware = [thunk];
// // const store = createStore(cartReducer, applyMiddleware(...middleware));

// // export default store;

// // store.js

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     // Add other reducers here if needed
//   },
// });

// export default store;

// store.js
import { configureStore } from '@reduxjs/toolkit';
// Adjust the import path
import dataReducer, { fetchDataAsync } from './dataSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

// Dispatch the fetchDataAsync thunk to fetch initial data
store.dispatch(fetchDataAsync());

export default store;
