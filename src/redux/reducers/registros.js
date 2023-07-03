// redux/reducers/index.js

import { FETCH_REGISTROS_SUCCESS, FETCH_REGISTROS_FAILURE } from '../actions/registros/types';
const initialState = {
  registros: {
   
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REGISTROS_SUCCESS:
      return {
        ...state,
        registros:action.payload,
      };
    case FETCH_REGISTROS_FAILURE:
      return {
        ...state,
        registros: action.payload,
      };
  
    default:
      return state;
  }
};

export default rootReducer;
