import axios from "axios";

const getHeader = (token) => {
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  return authHeader;
};

const get = (endPoint, token = "") => {
    return axios.get(endPoint, { headers: getHeader(token) })
  };
  const post = (endPoint, data = {}, token = "") => {
    return axios.post(endPoint, data, { headers: getHeader(token) });
  };
  const put = (endPoint, data = {}, token = "") => {
    return axios.put(endPoint, data, { headers: getHeader(token) });
  };
  const apiDelete = (endPoint, token = "") => {
    return axios.delete(endPoint, { headers: getHeader(token) });
  };

  export const httpClient = {
    get,
    post,
    delete: apiDelete,
    put,
  };