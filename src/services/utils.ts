export const mountUrlParams = (params?: [string, string | number][]) => {
  if (!params) return "";

  const validParams = params.filter((param) => param[0].trim() !== "");

  if (validParams.length === 0) return "";

  return `?${validParams
    .map((urlParam) => {
      return urlParam.join("=");
    })
    .join("&")}`;
};
