import qs from "@/libs/qs";

export const paramsSerializer = (params: any) =>
  qs.stringify(params, { arrayFormat: "repeat" });
