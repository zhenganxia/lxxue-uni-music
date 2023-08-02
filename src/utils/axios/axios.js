
const baseURL = "https://service-8wrqi8f5-1309355550.cd.apigw.tencentcs.com/release"
export const fetch = async (
  method,
  url,
  params,
  customHeaders = {},
) => {
  if (method) {
  return  uni.request({
      url:`${baseURL}${url}`,
      method,
      data:params,
      header:{
       ...customHeaders
      }
    })
  } else {
    return Promise.reject(new Error());
  }
};
export default fetch;
