import {getProductUrl} from '@constant/apiUrl';
import http from './http';

export const getProductData = () => {
  return http.get(getProductUrl);
};
