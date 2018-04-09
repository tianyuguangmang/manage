#xcx_admin
开发环境src

```
├── src                          
│   ├── api                             所有请求封装
│   ├── assets                          静态资源
│   ├── common                          公用功能模块
│   │   │
│   │   ├─- config                      配置信息
│   │   ├─- fetch axios                 配置
│   │   ├─- port_uri                    请求路径统一管理
│   │   ├─- storage                     本地缓存配置
│   │   └── tools                       工具(校验等)
│   │
│   ├── commponents                     公用组件
│   │   │
│   │   ├─- bottomToolBar               批量删除按钮 分页组件
│   │   ├─- eiditor                     富文本编辑器
│   │   ├─- leftSlide                   导航菜单列表
│   │   ├─- mainContent                 公用头部
│   │   └── panelTitle                	公用页面标题  
│   │   
│   ├── pages                         	页面
│   │   │ 
│   │   ├─- bannerManage               	广告管理 分页组件
│   │   │   ├─- activityBanner.vue    	首页活动banner图配置(美业)     
│   │   │   └── slideshow.vue         	首页banner配置(商城)
│   │   │
│   │   ├─- dataManage              
│   │   │   ├─- discountCoupon.vue      优惠券管理(美业)
│   │   │   ├─- evaluate.vue          	评价管理(公用)
│   │   │   ├─- hotelOrderList.vue      订单管理(酒店民宿)
│   │   │   ├─- proList.vue           	订单管理(美业/商城/企业/餐饮/外卖公用)
│   │   │   ├─- videoList.vue           视频管理(企业)
│   │   │   └── vipMember.vue         	会员管理(公用)
│   │   │
│   │   ├─- error              
│   │   │   └── 404.vue               	404页面
│   │   │
│   │   ├─- goodsManage                 商品管理
│   │   │   ├─- foodClass.vue         	商品分类(外卖)
│   │   │   ├─- foodList.vue          	商品列表(外卖)
│   │   │   ├─- goodsClass.vue        	商品分类(商城/企业)
│   │   │   ├─- goodsList.vue         	商品列表(商城/企业)
│   │   │   ├─- merchantErvices.vue   	产品服务(美业)
│   │   │   ├─- packages.vue          	套餐 （餐饮）
│   │   │   ├─- roomList.vue          	房型列表 （酒店民宿）
│   │   │   └── technicianList.vue    	技师管理(美业)
│   │   │
│   │   ├─- homePage                    首页
│   │   │   ├─- cateringMerchant.vue  	商家信息配置 (外卖)
│   │   │   ├─- cateringMerchant2.vue 	商家信息配置 （餐饮）
│   │   │   ├─- shopDiscription.vue   	商家信息配置(美业/商城/企业公用)
│   │   │   └── lodgeMerchant.vue       商家信息配置（酒店民宿）
│   │   │
│   │   ├─- merchantManage              商家管理
│   │   │   ├─- auditor.vue             审核员管理 
│   │   │   ├─- payment.vue             支付管理
│   │   │   ├─- registration.vue        注册管理
│   │   │   └── template.vue            模版管理
│   │   │
│   │   ├─- user              
│   │   │   └── login.Vue             	登录
│   │   │
│   │   └── App.vue              
│   │   
│   ├── router                        	全局路由配置
│   ├── store                         	VUEX配置
│   ├── app.vue                       	页面主入口
│   ├── index.HTML                    	HTML入口文件
│   └── main.js                       	全局JS入口


1 美业
2 商城
3 外卖
4 餐饮
5 企业
6 酒店
```
