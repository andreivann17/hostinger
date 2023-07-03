import {apiService} from "../../../containers/pages/utils/apiService";
import {FETCH_DATA_REGISTROS_DETAILS_SUCCESS,FETCH_DATA_REGISTROS_DETAILS_FAILURE, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_GENERAL_FAILURE,FETCH_DATA_GENERAL_SUCCESS,FETCH_DATA_REGISTROS_FAILURE,FETCH_DATA_REGISTROS_SUCCESS } from '../dashboard/types';
const token = localStorage.getItem("tokends");

export const actionDashboard = (parametros) => {
  parametros.token = token
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/${window.location.pathname.split("/")[1]}/dashboard/`,
        parametros
      );
      console.log(response.data.data)
      dispatch(fetchDataSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
export const actionDashboardRegistros = (parametros) => {
  parametros.token = token
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/${window.location.pathname.split("/")[1]}/registros/`,
        parametros
      );
      console.log(response.data.data)
      dispatch(fetchDataRegistrosSuccess(response.data.data));
   
    } catch (error) {
      dispatch(fetchDataRegistrosFailure(error.message));
    }
  };
};
export const actionDashboardDetailsRegistros = (url,parametros) => {
  parametros.token = token
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/${url}/`,
        parametros
      );
      console.log(response.data.data)
      dispatch(fetchDataRegistrosDetailsSuccess(response.data.data));
   
    } catch (error) {
      dispatch(fetchDataRegistrosDetailsFailure(error.message));
    }
  };
};
export const actionDashboardGeneral = (parametros) => {
  parametros.token = token
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin/${window.location.pathname.split("/")[1]}/general/`,
        parametros
      );
      console.log(response.data.data)
      dispatch(fetchDataGeneralSuccess(response.data.data));
 
    } catch (error) {
      dispatch(fetchDataGeneralFailure(error.message));
    }
  };
};
export const fetchDataSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
};


export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};
export const fetchDataGeneralSuccess = (dataDetails) => {
  return {
    type: FETCH_DATA_GENERAL_SUCCESS,
    payload: dataDetails,
  };
};


export const fetchDataGeneralFailure = (error) => {
  return {
    type: FETCH_DATA_GENERAL_FAILURE,
    payload: error,
  };
};

export const fetchDataRegistrosSuccess = (dataDetails) => {
  return {
    type: FETCH_DATA_REGISTROS_SUCCESS,
    payload: dataDetails,
  };
};
export const fetchDataRegistrosFailure = (error) => {
  return {
    type: FETCH_DATA_REGISTROS_FAILURE,
    payload: error,
  };
};

export const fetchDataRegistrosDetailsSuccess = (dataDetails) => {
  return {
    type: FETCH_DATA_REGISTROS_DETAILS_SUCCESS,
    payload: dataDetails,
  };
};
export const fetchDataRegistrosDetailsFailure = (error) => {
  return {
    type: FETCH_DATA_REGISTROS_DETAILS_FAILURE,
    payload: error,
  };
};