import {apiService} from "../../../containers/pages/utils/apiService";
import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_DETAILS_SUCCESS, FETCH_DATA_DETAILS_FAILURE } from './types';
const token = localStorage.getItem("tokends");

export const actionCatalogos = (parametros) => {
 
  parametros.token = token
  return async (dispatch) => {
    try {

      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin${window.location.pathname}/cards/`,
        parametros
      );
      dispatch(fetchDataSuccess(response.data.data));
    } catch (error) {
      alert(error)
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const actionOpeShow = (callback) => {
 
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://${window.location.hostname}:8000/app/admin${window.location.pathname}/`,
        {token:token}
      );
      dispatch(fetchDataDetailsSuccess(response.data.data));
      callback()
    } catch (error) {
      dispatch(fetchDataDetailsFailure(error.message));
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


export const fetchDataDetailsSuccess = (dataDetails) => {
  return {
    type: FETCH_DATA_DETAILS_SUCCESS,
    payload: dataDetails,
  };
};


export const fetchDataDetailsFailure = (error) => {
  return {
    type: FETCH_DATA_DETAILS_FAILURE,
    payload: error,
  };
};