/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
import Page from 'pages/App'
//home
// import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'

import loginComponent from 'pages/user/login'
import adminApplyComponent from 'pages/admin/apply'
import commonPayComponent from 'pages/common/pay'
import adminTemplateComponent from 'pages/admin/template'
import adminCheckerComponent from 'pages/admin/checker'
import adminTemplatemsgComponent from 'pages/admin/templatemsg'
import commonPayDetailComponent from 'pages/common/paydetail'
import evaluateComponent from 'pages/admin/evaluate'
import merchantComponent from 'pages/admin/merchant'
import balanceComponent from 'pages/admin/balance/index'
import balanceOrderComponent from 'pages/admin/balance/order'
import balanceRecordComponent from 'pages/admin/balance/record'
//审核人员
import checkApplyComponent from 'pages/check/checkapply'
import billDetailComponent from 'pages/bill/billdetail'
import recordsComponent from 'pages/bill/records'



Vue.use(VueRouter)

var defaultHomePage = "/login";

// 使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [
  {
    path: '/404',
    name: 'notPage',
    component: noPageComponent
  }, 
  {
    path: '*',
    redirect: '/404'
  }, 

  {
    path:"/",
    redirect:'/login',
    name:"index",
    component:Page,
    children:[
      {
        path: '/merchant/billdetail',
        name:"billdetail",
        component:billDetailComponent 
      }, 
      {
        path: '/merchant/records',
        name:"records",
        component:recordsComponent 
      }, 
      {
        path: '/common/pay/detail',
        name:"billdetail",
        component:commonPayDetailComponent 
      }, 
   
     {
        path: '/admin/template/add',
        name:"addTemplate",
        component:adminTemplatemsgComponent 
      }, 
      {
        path: '/admin/apply',
        name:"apply",
        component:adminApplyComponent 
      }, 
      {
        path: '/common/pay',
        name:"pay",
        component:commonPayComponent 
      }, 
      {
        path: '/admin/template',
        name:"template",
        component:adminTemplateComponent 
      }, 
      {
        path: '/admin/checker',
        name:"checker",
        component:adminCheckerComponent 
      },
      {
        path: '/admin/evaluate',
        name:"evaluate",
        component:evaluateComponent 
      },
      {
        path: '/check/apply',
        name:"checkapply",
        component:checkApplyComponent 
      },
      {
        path: '/admin/merchant',
        name:"merchant",
        component:merchantComponent 
      },
      {
        path: '/admin/balance',
        name:"balance",
        component: balanceComponent,
      },
      {
        path: '/admin/balance/order/:year/:month',
        name: "balanceOrder",
        component:balanceOrderComponent 
      },
      {
        path: '/admin/balance/record/:year/:month',
        name:"balanceRecord",
        component:balanceRecordComponent 
      },
    ]
  },
  {
    path:"/login",
    name:"login",
    component:loginComponent
  }
 /* {
    path: '/',
    redirect: defaultHomePage,
    component: viewPageComponent,
    children: [{
      path: '/shopDiscription',
      name: 'shopDiscription',
      component: shopDiscription,
      meta: {
        title: "商家信息",
        auth: true
      }
    }]
  }*/
]

const router = new VueRouter({
  routes,
  mode: 'history', //default: hash ,history
  scrollBehavior(to, from, savedPosition) {
    /*if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }*/
  }
})


// 全局路由配置
// 路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  console.log("***",to.path);
  
  if(store.state.user_info.login||to.path=="/login"){
    next();
  }else{
    next({
      name: 'login'
    })
  }
 
  
})

// //路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
