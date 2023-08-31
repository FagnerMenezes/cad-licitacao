import { api } from "../services/index";

const useFetch = {
  get: async (url, params) => {
    return api
      .get(url, { params: params })
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
  getDataGovernment: async () => {
    return api
      .get("processos?", {
        params: {
          start: "1990-01-01",
          end: "2050-12-31",
          skip: 0,
          limit: 1000,
        },
      })
      .then((response) => {
        return response.data.process;
      })
      .catch((error) => error);
  },
  post: async (url, data) => {
    //console.log(data);
    return api
      .post(url, data)
      .then((response) => {
        //console.log(response);
        return response;
      })
      .catch((error) => console.log(error));
  },
  put: async (url, data) => {
    return api
      .put(url, data)
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
  delete: async (url) => {
    return api
      .delete(url)
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  },
};

export default useFetch;
