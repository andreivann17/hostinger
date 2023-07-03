import {apiService,apiServicePatch} from "../../../containers/pages/utils/apiService";
const token  = localStorage.getItem("tokends")
import {FETCH_REGISTROS_FAILURE,FETCH_REGISTROS_SUCCESS} from "./types"
export const actionRegistros = (parametros) => {
  parametros.token
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/registros/`,
        parametros
      );
      dispatch(fetchRegistrosSuccess(response.data.data))
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const actionAgregar = (parametros,callback) => {
    parametros.token = token
    return async (dispatch) => {
      try {
        const response = await apiService.fetchData(
          `http://${window.location.hostname}:8000/app/admin/registros/`,
          parametros
        );
        callback(response.data.data.msg)
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const fetchRegistrosSuccess = (data) => {
    return {
      type: FETCH_REGISTROS_SUCCESS,
      payload: data,
    };
  };
  
  
  export const fetchRegistrosFailure = (error) => {
    return {
      type: FETCH_REGISTROS_FAILURE,
      payload: error,
    };
  };