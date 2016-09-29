import axios from 'axios';
import config from './config';

const api = null;

class baseAPI {
  getInitializedApi() {
    if (api) return api; // return initialized api if already initialized.
    return axios.create({
      baseURL: config.url,
      responseType: 'json',
      withCredentials: true
    });
  }

  get(url) {
    return this.getInitializedApi().get(url);
  }

  post(url, data) { // eslint-disable-line no-unused-vars
    return this.getInitializedApi().post(url, data);
  }
}

export default baseAPI;
