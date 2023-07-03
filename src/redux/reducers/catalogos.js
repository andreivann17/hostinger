// redux/reducers/index.js

import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_DETAILS_SUCCESS, FETCH_DATA_DETAILS_FAILURE } from '../actions/catalogos/types';
const initialState = {
  catalogos: {
    
  },
  details: {
   
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        catalogos:action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        catalogos: action.payload,
      };
    case FETCH_DATA_DETAILS_SUCCESS:
      return {
        ...state,
        details:action.payload,
      };
    case FETCH_DATA_DETAILS_FAILURE:
      return {
        ...state,
        details:action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
