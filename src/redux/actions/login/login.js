import {apiService} from "../../../containers/pages/utils/apiService";
const token  = localStorage.getItem("tokends")
export const actionComprobar = (parametros,callback,callbackError) => {
  parametros.opcion = "LOGIN"
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/login/`,
        parametros
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionCorreo = (parametros,callback,callbackError) => {
  parametros.opcion = "CORREO"
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/login/`,
        parametros
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionCodigo = (parametros,callback,callbackError) => {
  parametros.opcion = "CODIGO"
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/login/`,
        parametros
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionNewPassword = (parametros,callback,callbackError) => {
  parametros.token = token
  parametros.opcion = "NEWPASSWORD"
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/login/`,
        parametros
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};