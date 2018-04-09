/**
 * @author tygm
 * @Date 2017/11/25
 */
import axios from "axios";
import router from 'src/router'
import store from 'src/store'

import * as actions from 'src/store/actions/type'
const request = (headers) => {
  return axios.create({
    //设置默认根地址
    baseURL: "",
    //设置请求超时设置
    timeout: 1000,
    //设置请求时的header
    headers: headers,
    withCredentials: true
  })

}
const formatParams = (_object) => {
  var _arr = [];
  for (var name in _object) {
    _arr.push(name + "=" + _object[name]);
  }
  return _arr.join("&");
}
export default new class http {
  constructor() {

  }
  // 可选地，上面的请求可以这样做
  get(url, params) {
    return new Promise((resolve, reject) => {
      request({
        'Content-Type': 'application/x-www-form-urlencoded'
      }).get(url, {params}).then(({
        data
      }) => {
        if (data.code == 200) {
          resolve(data)
        } else if (data.code == 582) {
          store.dispatch(actions.SET_USER_INFO, null)
          router.replace({
            name: 'login'
          });
        } else {
          reject(data)
        }
      }).catch((res) => {
      })
    })

  }
  post(url, params) {
    return new Promise((resolve, reject) => {
      request({
        'Content-Type': 'application/x-www-form-urlencoded'
      }).post(url, formatParams(params)).then(({
        data
      }) => {
        if (data.code == 200) {
          resolve(data)
        } else if (data.code == 582) {
          store.dispatch(actions.SET_USER_INFO, null)
          router.replace({
            name: 'login'
          });
        } else {
          reject(data)
        }
      }).catch((res) => {
      })
    })
  }
  json(url, params) {
    return new Promise((resolve, reject) => {
      request({
          'Content-Type': 'application/json'
        }).post(url, params)
        .then(({
          data
        }) => {
          if (data.code == 200) {
            resolve(data)
          } else if (data.code == 582) {
            store.dispatch(actions.SET_USER_INFO, null)
            router.replace({
              name: 'login'
            });
          } else {

            reject(data)
          }
        })
        .catch((res) => {})
    })
  }
}
