// redux/reducers/index.js

import { FETCH_DIVISAS_SUCCESS, FETCH_DIVISAS_FAILURE } from '../actions/divisas/types';
const initialState = {
  divisas: {
   
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIVISAS_SUCCESS:
      return {
        ...state,
        divisas:action.payload,
      };
    case FETCH_DIVISAS_FAILURE:
      return {
        ...state,
        divisas: action.payload,
      };
  
    default:
      return state;
  }
};

export default rootReducer;
