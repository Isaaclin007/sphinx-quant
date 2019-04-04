// import { stringify } from 'qs';
import request from '@/utils/request';

export default async function getStrategyList() {
  return request('/api/strategy');
}
