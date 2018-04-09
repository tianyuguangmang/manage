/**
 * Created by zzmhot on 2017/3/23.
 *
 * 主程序入口
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:19
 * @Copyright(©) 2017 by zzmhot.
 *
 */

//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-default/index.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'

//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
import api from "./api"
//导入七牛组件
// import qiniu from "qiniu-js"
import VueQuillEditor from 'vue-quill-editor'
import VueStomp from "vue-stomp"
import axios from "axios"




window.axios = axios;

Vue.use(VueStomp)

// mount with global
Vue.use(VueQuillEditor)

//使用element-ui
Vue.use(ElementUI)

//使用自定义插件
Vue.use(Plugins)
Vue.use(api)

//发布后是否显示提示
//Vue.config.productionTip = false

//是否开启工具调试
//Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.filter('money', function (value, type) {
  return value + " " + type
})
Vue.filter('trim', function (value) {
  return value.trim();
})

new Vue({
  el:"#project-container",
  router,
  store,
  render: h => h(App)
})
