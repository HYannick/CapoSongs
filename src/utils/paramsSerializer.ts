import qs from 'qs';

export const paramsSerializer = (params: any) => qs.stringify(params, { arrayFormat: 'repeat' });
