// // import { loginOut } from '@/api/user/userIndex';
// // import HeaderSign from 'bt-sign-header/lib/src/index';
// // const { VUE_APP_APPKEY, VUE_APP_SECRETKEY } = process.env;
// export const reqSuccess = (config) => {
//   // const { customHeaders, customConfig } = config;
//   // // 签名
//   // const headerSign = new HeaderSign(VUE_APP_APPKEY, VUE_APP_SECRETKEY).mobile(
//   //   config
//   // );
//   // config = { ...config, ...customConfig };
//   // config.headers = { ...config.headers, ...headerSign, ...customHeaders };
//   // delete config.customHeaders;
//   // delete config.customConfig;
//   return config;
// };

// export const reqError = (error) => {
//   // 请求失败处理
//   return Promise.reject(error);
// };

// export const resSuccess = (response) => {
//   const { code } = response.data
//   // if (code === "601019" || code === '629053') {
//   //   // token 不存在
//   //   sessionStorage.clear();
//   //   window.location.href = '/';
//   //   return
//   // }
//   // 响应成功处理
//   return response;
// };

// export const resError = (error) => {
//   // 响应失败处理-后端响应status非200走这里
//   // loginOut();
//   return Promise.reject(error);
// };
