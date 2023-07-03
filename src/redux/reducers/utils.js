const initialState = {
  scroll: {
   
  },
};
import {FETCH_SCROLL} from "../actions/utils/types"
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCROLL:
      return {
        ...state,
        scroll:action.payload,
      };
    
    default:
      return state;
  }
};

export default rootReducer;
