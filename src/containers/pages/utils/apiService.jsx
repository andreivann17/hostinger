import axios from "axios";
import Cookies from "js-cookie";

export const apiService = {
  fetchData: (url, parameters) => {
    const csrftoken = Cookies.get("csrftoken");

    return axios.post(url, parameters, {
      headers: {
        "X-CSRFToken": csrftoken,

      },
    });
  },
};
export const apiServicePatch = {
  fetchData: (url, parameters) => {
    const csrftoken = Cookies.get("csrftoken");
    return axios.patch(url, parameters, {
      headers: {
        "X-CSRFToken": csrftoken,
      
      },
    });
  },
};
