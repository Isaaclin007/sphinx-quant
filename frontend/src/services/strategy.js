import { stringify } from 'qs';
import request from '@/utils/request';

export async function getStrategyList() {
  return request('/api/strategy');
}

export async function getStrategyCode(params) {
  return request(`/api/code?${stringify(params)}`);
}
