<template>
  <div class="data-list">
     
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
    console.log(this.$store.state.user_info,"swef");
    if(adminMsg =="SUPER"){
      this.nav_menu_data = [
        {
          path:"/login",
          title:"商家管理",
          child:[{
              path:'/admin/apply',
              title:"注册申请"
            },
            {
              path:'/admin/pay',
              title:"支付管理"
            },
            {
              path:'/admin/template',
              title:"模板管理"
            },
            {
              path:'/admin/checker',
              title:"审核员管理"
            }
          ]
        }
      ]
    }else{
      this.nav_menu_data = [
        {
          path:"/login",
          title:"商家管理",
          child:[{
              path:'/apply/check',
              title:"注册申请"
            },
            {
              path:'/admin/pay',
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
