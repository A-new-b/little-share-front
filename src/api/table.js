import { axios, axiosFile } from './request';
import { api } from './tools';

export function getSpace() {
  return axios({
    url: `${api}/maxSpace`,
    method: 'get',
  });
}

export function getFileList() {
  return axios({
    url: `${api}/files`,
    method: 'get',
  });
}

export function deleteFile(name) {
  return axios({
    url: `${api}/files/${name}`,
    method: 'delete',
  });
}

export function getFile(name) {
  return axios({
    url: `${api}/files/${name}`,
    method: 'get',
  });
}
export function postFlie(formData, callback1) {
  return axiosFile({
    url: `${api}/upload`,
    method: 'post',
    data: formData,
    onUploadProgress(progressEvent) {
      if (progressEvent.lengthComputable) {
        callback1(progressEvent);
      }
    },
  });
}
