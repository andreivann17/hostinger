import {FETCH_SCROLL} from "./types"
export const actionScroll = (value) => {
    return async (dispatch) => {
        dispatch(fetchScroll(value))
    };
};
export const fetchScroll = (value) => {
    return {
      type: FETCH_SCROLL,
      payload: value,
    };
};
  