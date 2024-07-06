import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.defaults.crossDomain = true;
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'Access-Control-Allow-Origin': '*', 
};

export default function req() {
  return {
    async request(method, options) {
      const extraOptions = options.request.extraOptions != null ? options.request.extraOptions : {};
      const extraHeaders = extraOptions.headers != null ? extraOptions.headers : {};
      const headers = {...axiosInstance.defaults.headers, ...extraHeaders};
      
      extraOptions.headers = headers;
      
      return await axiosInstance({
        method,
        url: options.request.url,
        data: JSON.stringify(options.request.payload),
        ...extraOptions
      }).then(response => {
        if (options.callback != null) options.callback(response.data);
        return response.data;
      }).catch(error => {
        if (options.errorCallback != null) options.errorCallback(error);
        console.error(error);
        return error;
      }).finally(response => {
        if (options.finallyCallback != null) options.finallyCallback(response);
        return response;
      })
    },
    async postRequestPromise(options) {
      return await this.request('post', options);
    },
    async postRequest(options) {
      return this.request('post', options);
    },
    async getRequestPromise(options) {
      return await this.request('get', options);
    },
    async getRequest(options) {
      return this.request('get', options);
    },
    async putRequestPromise(options) {
      return await this.request('put', options);
    },
    async putRequest(options) {
      return this.request('put', options);
    },
    async deleteRequestPromise(options) {
      return await this.request('delete', options);
    },
    async deleteRequest(options) {
      return this.request('delete', options);
    }
  }
}