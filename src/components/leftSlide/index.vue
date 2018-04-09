<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <div class="logobox">
          <h2>管理后台</h2>
          <h4>XIAO CHENG XU</h4>
        </div>
      </router-link>

      <el-menu class="menu-box" theme="dark" :router=true :default-active="$route.path" @select="menuSelect">
        <div v-for="(item, index) in nav_menu_data">
          <el-menu-item class="menu-list" v-if="typeof item.child === 'undefined'" :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu :index="item.path" v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item class="menu-list" v-for="(sub_item, sub_index) in item.child" :index="sub_item.path" :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">

export default {
  name: "slide",
  data() {
    return {
      key: "",
      opend: [],
      nav_menu_data: []
    };
  },
  created() {

    let adminMsg = this.$store.state.user_info.user;
    
    if(adminMsg =="SUPER"){
      this.nav_menu_data = [
        {
          path:"/login",
          title:"商家管理",
          icon: "fa-home",
          child:[{
              path:'/admin/apply',
              title:"注册申请"
            },
            {
              path:'/common/pay',
              title:"支付管理"
            }
          ]
        },
        {
          path:"/template",
          title:"模版管理",
          icon: "fa-table",
          child:[
            {
              path:'/admin/template',
              title:"模板开发"
            },
            {
              path:'/admin/evaluate',
              title:"模版评价"
            },
          ]
        },
        {
          path:'/admin/checker',
          title:"审核员管理",
          icon:"fa-user-circle"
        },
        {
          path:'/admin/merchant',
          title:"配送商户管理",
          icon:"fa-address-book-o"
        },
        {
          path:'/admin/balance',
          title:"结算对账表",
          icon:"fa-money"
        },
      ]
    }else{
      this.nav_menu_data = [
        {
          path:"/login",
          title:"商家管理",
          child:[{
              path:'/check/apply',
              title:"注册申请"
            },
            {
              path:'/common/pay',
              title:"支付管理"
            }
          ]
        }
      ]
    }

  },
  methods: {
    menuSelect(key, keyPath) {
      console.log(key);
      this.key = key;
    }
  }
};
</script>
<style type="text/css">
.logobox {
  height: 80px;
  background: #ff5555;
  color: #fff;
  padding-top: 20px;
}
.logobox h2 {
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>
