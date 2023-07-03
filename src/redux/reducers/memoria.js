// redux/reducers/index.js

import { FETCH_MEMORIA_SUCCESS, FETCH_MEMORIA_FAILURE } from '../actions/memoria/types';
const initialState = {
  memoria: {
   
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMORIA_SUCCESS:
      return {
        ...state,
        memoria:action.payload,
      };
    case FETCH_MEMORIA_FAILURE:
      return {
        ...state,
        memoria: action.payload,
      };
  
    default:
      return state;
  }
};

export default rootReducer;
