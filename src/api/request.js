import axio from 'axios';
// 创建axios实例
const service = axio.create({
  timeout: 20000,
});
const serviceFile = axio.create({
  timeout: 20000,
  headers: { 'Content-Type': 'multipart/form-data' },
});
const err = (error) => {
  if (error.response) {
    // notify("error", `${error.response.status}网络异常`);
    alert(error.response.status);
  }
  return Promise.reject(error);
};
service.interceptors.response.use(response => response, err);
serviceFile.interceptors.response.use(response => response, err);
export { service as axios };
export { serviceFile as axiosFile };
