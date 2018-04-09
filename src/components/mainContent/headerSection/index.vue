<template>
	<div class="header-section">
		<div class="left">
      <div class="counter">
        <router-link to="/admin/apply">
          <img class="img" src="./images/icon_4.png" title="申请管理" />
        </router-link>
        <span class="info"><span class="info-label">申请：</span>
          <el-tooltip content="已通过数" placement="bottom"><span class="newCount">{{$store.state.passCount}}</span></el-tooltip><el-tooltip content="总申请数" placement="bottom"><span>/{{$store.state.regAllCount}}</span></el-tooltip>
        </span>
      </div>
      <span class="center-line"></span>
      <div class="counter">
      <router-link to="/common/pay">
        <img class="img" src="./images/icon_5.png" title="支付管理" />
      </router-link>
      <span class="info"><span class="info-label">支付：</span>
        <el-tooltip content="已支付数" placement="bottom"><span class="newCount">{{$store.state.payCount}}</span></el-tooltip><el-tooltip content="待支付数" placement="bottom"><span>/{{$store.state.waitPayCount}}</span></el-tooltip>
      </span>
      </div>
		</div>
		<div class="right">
			<div style="margin-right:10px" class="userinfo">
				<img style="width:60px;height:60px;border-radius:50%;margin-right:10px;" class="userPhoto" src="./images/head.png"></img>
				<span class="username">{{$store.state.user_info.phone}}</span>
			</div>
			<img @click="loginout" class="loginout" src="./images/close.png"></img>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapActions,mapState} from "vuex";
import { SET_USER_INFO } from "store/actions/type";


export default {
  data() {
    return {
    };
  },
  created(){
    this.getNumber();
  },
  computed:{
    ...mapState(['user_info'])
  },
  mounted() {
    // var _this = this;
  },
  methods: {
    getNumber() {
      this.$fetch.api_getData
        .infoCountData()
        .then((data ) => {
          this.$store.state.passCount = data.results.passCount;
          this.$store.state.regAllCount = data.results.regAllCount;
          this.$store.state.waitPayCount = data.results.waitPayCount;
          this.$store.state.payCount = data.results.payCount;
          this.$store.state.allBalance = data.results.allBalance;
        })
        .catch((data) => {
          this.$message.error(data.errors);
        });
    },
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    loginout() {
      this.$fetch.api_getData.loginOut({}).then((data) => {
        if (data.code == 200) {
          this.set_user_info(null);
          this.$message.success("登出成功");
          setTimeout(this.$router.replace({ name: "login" }), 500);
        }
      });
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
// $--sm: 768px !default;
// $--md: 992px !default;
// $--lg: 1200px !default;
// $--xl: 1920px !default;
@media screen and (max-width: 768px) {
  .header-section .left {
    display: none !important;
  }
}
@media screen and (max-width: 900px) {
  .header-section .left .counter .img {
    display: none !important;
  }
}
@media screen and (max-width: 1200px) {
  .header-section .left .counter .info .info-label {
    display: none !important;
  }
}
.header-section {
  height:100px;
  line-height: 100px;
  width:100%;
  .userinfo {
    display: inline-block;
  }
  .left {
    display:inline-block;
    height: 100%;
    line-height: 100px;
    min-width: 450px;
    margin-left:220px;
    .counter {
      display: inline;
      margin: 0 0 0 20px;
      .img {
        position: relative;
        top: -6px;
        margin-right: 8px;
      }
      .info {
        font-size: 18px;
        color: #48576a;
        .newCount {
          cursor: pointer;
          color: #333;
          font-size: 28px;    
        }
      }
    }
    .center-line {
      display: inline-block;
      height: 50px;
      width: 0;
      border-right: 1px solid #ddd;
      margin-left: 20px;
      margin-right: 0;
      position: relative;
      top: 16px;
    }
  }
  .right {
    display:inline-block;
    height: 100%;
    line-height: 100px;
    position:absolute;
    right:0;
    /* min-width:350px; */
    .messagebox {
      display: inline-block;
      position: relative;
      margin-left: 20px;
      margin-right: 20px;
      line-height: 100%;
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
      }
      .messageNumber {
        position: absolute;
        right: -3px;
        top: -3px;
        display: inline-block;
        text-align: center;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: #ff5555;
        color: #fff;
        // span {
        //   text-align: center;
        //   line-height: 10px;
        // }
      }
    }
  }
}

.userPhoto {
  margin-right: 10px;
}
.loginout {
  margin-right: 25px;
  cursor: pointer;
}
.code-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 5000;
  background: rgba(200, 200, 200, 0.5);
}
.code-dialog-content {
  width: 300px;
  height: 320px;
  margin: 200px auto 0;
  padding: 25px 20px;
  position: relative;
  background: #fff;
  text-align: center;
  i {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  img {
    width: 260px;
    height: 260px;
    margin-bottom: 20px;
  }
  button {
    position: absolute;
    width: 130px;
    bottom: 20px;
    left: 50%;
    margin-left: -65px;
  }
}
.messageNumber {
  animation: myfirst 0.35s infinite;
}

@keyframes myfirst {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -5px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
