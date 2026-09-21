import axios from 'axios';

import { env } from '@/app/config/env';
import { errorInterceptor, requestInterceptor } from './interceptor';

export const httpClient = axios.create({
  baseURL: env.backendUrl + '/api',
  timeout: 10000,
  withCredentials: true,
});

httpClient.interceptors.request.use(requestInterceptor);

httpClient.interceptors.response.use((response) => response, errorInterceptor);
