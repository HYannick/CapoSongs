const qs = require('qs');

export const paramsSerializer = (params: any) =>
  qs.stringify(params, { arrayFormat: "repeat" });
