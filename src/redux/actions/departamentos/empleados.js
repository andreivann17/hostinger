import {apiService,apiServicePatch} from "../../../containers/pages/utils/apiService";
const token  = localStorage.getItem("tokends")
export const actionEditar = (parametros,callback,callbackError) => {
  parametros.token = token
  parametros.opcion = "EDITANDO"
  return async (dispatch) => {
    try {
      const response = await apiServicePatch.fetchData(
        `http://${window.location.hostname}:8000/app/admin${window.location.pathname}/form/`,
        parametros
      );
      callback()
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionAgregar = (parametros,callback,callbackError) => {
    parametros.token = token
    return async (dispatch) => {
      try {
        const response = await apiService.fetchData(
          `http://${window.location.hostname}:8000/app/admin${window.location.pathname}/form/`,
          parametros
        );
        callback(response.data.msg)
      } catch (error) {
        callbackError(error.message);
      }
    };
};
export const actionEliminar = (parametros,callback,callbackError) => {
  parametros.token = token
  parametros.opcion = "ELIMINANDO"
    return async (dispatch) => {
      try {
        const response = await apiServicePatch.fetchData(
          `http://${window.location.hostname}:8000/app/admin${window.location.pathname}/form/`,
          parametros
        );
        callback()
      } catch (error) {
        callbackError(error.message);
      }
    };
};
