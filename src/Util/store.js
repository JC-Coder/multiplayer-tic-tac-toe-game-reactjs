import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  socket: null
};

const rootReducer = (state = initialState, action) => {
    console.log({state, action});
  switch (action.type) {
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload
      };
    default:
      return state;
  }
};

const store = configureStore({
    reducer: rootReducer
})

export default store;