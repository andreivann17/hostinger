import {apiService,apiServicePatch} from "../../../containers/pages/utils/apiService";
const token  = localStorage.getItem("tokends")
import {FETCH_DIVISAS_FAILURE,FETCH_DIVISAS_SUCCESS} from "./types"
export const actionDivisas = () => {
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/divisas/`,
        {token:token}
      );
      dispatch(fetchDivisasSuccess(response.data.data))
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const actionEditar = (parametros,callback) => {
    parametros.token = token
    return async (dispatch) => {
      try {
        const response = await apiServicePatch.fetchData(
          `http://${window.location.hostname}:8000/app/admin/divisas/`,
          parametros
        );
        callback(response.data.data.msg)
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const fetchDivisasSuccess = (data) => {
    return {
      type: FETCH_DIVISAS_SUCCESS,
      payload: data,
    };
  };
  
  
  export const fetchDivisasFailure = (error) => {
    return {
      type: FETCH_DIVISAS_FAILURE,
      payload: error,
    };
  };