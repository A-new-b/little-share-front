import { axios, axiosFile } from './request';

export function getSpace() {
  return axios({
    url: `maxSpace`,
    method: 'get',
  });
}

export function getFileList() {
  return axios({
    url: `files`,
    method: 'get',
  });
}

export function deleteFile(name) {
  return axios({
    url: `files/${name}`,
    method: 'delete',
  });
}

export function getFile(name) {
  return axios({
    url: `files/${name}`,
    method: 'get',
  });
}
export function postFlie(formData, callback1) {
  return axiosFile({
    url: `upload`,
    method: 'post',
    data: formData,
    onUploadProgress(progressEvent) {
      if (progressEvent.lengthComputable) {
        callback1(progressEvent);
      }
    },
  });
}
