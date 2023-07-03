// redux/reducers/index.js

import { FETCH_DATA_REGISTROS_DETAILS_SUCCESS,FETCH_DATA_REGISTROS_DETAILS_FAILURE, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_GENERAL_FAILURE,FETCH_DATA_GENERAL_SUCCESS,FETCH_DATA_REGISTROS_FAILURE,FETCH_DATA_REGISTROS_SUCCESS} from '../actions/dashboard/types';

const initialState = {
  dashboard: {
   
  },
  general: {
  
  },  registros: {
    
  
  },
  registrosDetails: {
    
  
  },
};

const rootReducer = (state = initialState, action) => {
  console.log(action.payload)
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        dashboard:action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        dashboard: action.payload,
      };
    case FETCH_DATA_GENERAL_SUCCESS:
      return {
        ...state,
        general:action.payload,
      
      };
    case FETCH_DATA_GENERAL_FAILURE:
      return {
        ...state,
        general:action.payload,
      };
      case FETCH_DATA_REGISTROS_SUCCESS:
      return {
        ...state,
        registros:action.payload,
      
      };
    case FETCH_DATA_REGISTROS_FAILURE:
      return {
        ...state,
        registros:action.payload,
      };
      case FETCH_DATA_REGISTROS_SUCCESS:
      return {
        ...state,
        registros:action.payload,
      
      };
    case FETCH_DATA_REGISTROS_FAILURE:
      return {
        ...state,
        registros:action.payload,
      };
      case FETCH_DATA_REGISTROS_FAILURE:
      return {
        ...state,
        registros:action.payload,
      };
      case FETCH_DATA_REGISTROS_DETAILS_SUCCESS:
      return {
        ...state,
        registros:action.payload,
      
      };
    case FETCH_DATA_REGISTROS_DETAILS_FAILURE:
      return {
        ...state,
        registros:action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
