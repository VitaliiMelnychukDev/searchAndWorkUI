import axios  from 'axios';
import { ApiUrlHelper} from '../helpers/ApiUrlHelper';
import {TokenHelper} from '../helpers/TokenHelper';
import {authorizationCode, header} from '../constants/request';
import {apiAuthPath} from '../constants/apiPaths';


const searchAndWorkClient = axios.create({
  baseURL: ApiUrlHelper.getBaseApiUrl()
});

searchAndWorkClient.interceptors.request.use((config) => {
  const authorizationHeader = TokenHelper.getAuthorizationHeader();

  if (authorizationHeader) {
    config.headers[header.authorization] = authorizationHeader;
  }

  return config;
});

searchAndWorkClient.interceptors.response.use(response => {
  return response.data.data;
}, err => {
  const originalRequest = err.config;
  const refreshToken = TokenHelper.getRefreshToken();

  if (err.response.status === authorizationCode.unauthorized && refreshToken && !originalRequest.retry) {
    originalRequest.retry = true;

    return axios.post(ApiUrlHelper.buildFullUrl(apiAuthPath.refresh),
      {
        refreshToken: TokenHelper.getRefreshToken()
      })
      .then(res => {
        TokenHelper.saveTokens(res.data.data.accessToken, res.data.data.refreshToken);

        return searchAndWorkClient(originalRequest);
      }).catch((error) => {
        TokenHelper.clearTokens();

        return Promise.reject(error.response.data);
      });
  } else {
    return Promise.reject(err.response.data);
  }
});

export default searchAndWorkClient;