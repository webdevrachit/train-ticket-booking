import Storage from './Storage';
import axios from 'axios';
import querystring from 'querystring';
import { store } from "store/";
// import { logout } from "store/actions/account.actions";

import config from 'config/';

/*axios.interceptors.request.use((config) => {
  // console.log(`Request [${ config.method }] ${ config.url }`, config);
  return config;
});
*/
axios.interceptors.response.use((response) => {
    // console.log("response", response);
    return response;
  },
  (error) => {
    console.log("error", error);
    return error;
  }
)

const execute = async (path, method = 'GET', { params = {} , queries = {}, payloads = {}, headers = {} } = {}) => {

  const apiKey = await Storage.getApiKey();
  const base = config.api.apiBaseURL.replace(/~\/$/, '');

  if (apiKey) {
    headers['Auth-Token'] = `${ apiKey }`;
  }

  if ( ! headers['Content-Type']) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  if ( ! headers['Accept']) {
    headers['Accept'] = 'application/json';
  }

  const options = {
    data : params,
    method : method,
    headers : headers,
  };

  if (method === 'POST' || method === 'PATCH') {
    options.data = querystring.stringify(payloads);
  }

  if (queries) {
    options.params = queries;
  }

  if(method === 'FILE'){
    options.method = 'POST';
    options.data = payloads;
  }

  options.url = path;
  options.baseURL = base;
  // console.log("Request",options)
  return await axios(options);
};


export default {
  get: (path, options) => execute(path, 'GET', options),
  post: (path, options) => execute(path, 'POST', options),
  upload: (path, options) => execute(path, 'FILE', options),
  patch: (path, options) => execute(path, 'PATCH', options),
  delete: (path, options) => execute(path, 'DELETE', options),
};