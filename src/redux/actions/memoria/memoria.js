import {apiService,apiServicePatch} from "../../../containers/pages/utils/apiService";
const token  = localStorage.getItem("tokends")
import {FETCH_MEMORIA_FAILURE,FETCH_MEMORIA_SUCCESS} from "./types"
export const actionMemoria = () => {
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/memoria/`,
        {token:token}
      );
      dispatch(fetchMemoriaSuccess(response.data.data))
    } catch (error) {
      console.log(error.message);
    }
  };
};

  
  export const fetchMemoriaSuccess = (data) => {
    return {
      type: FETCH_MEMORIA_SUCCESS,
      payload: data,
    };
  };
  
  
  export const fetchMemoriaFailure = (error) => {
    return {
      type: FETCH_MEMORIA_FAILURE,
      payload: error,
    };
  };