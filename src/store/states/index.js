/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import {localStorage} from 'common/storage'

export default {
  //用户信息和是否登录
  user_info: localStorage.get('user_info'),
  messageNumber:0,
  passCount: 0,
  regAllCount: 0,
  waitPayCount: 0,
  payCount: 0,
  allBalance: null,
}
