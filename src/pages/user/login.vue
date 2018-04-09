<template>
  <div class="login-body">
    <div class="loginWarp" v-loading="load_data" element-loading-text="正在登陆中..." @keyup.enter="submit_form">
      <div class="login-title">
        <p>后台登录</p>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form"  :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input v-model.trim="form.phone" placeholder="请输入账户名：" class="form-input" :autofocus="true" ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model.trim="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <!--  <el-form-item prop="password" class="login-item">
              <el-input type="password" placeholder="请输入账户密码：" class="form-input"></el-input>
            </el-form-item> -->
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
          </el-form-item>
          <div class="flex-x" @click="setPassword"><div class="flex-1"></div><div class="find-password">忘记密码?</div></div>
        </el-form>
      </div>
    </div>
    <div class="cover"  v-if="setPasswordShow"></div>
    <div class="" v-if="setPasswordShow" >
    <el-form class="update-msg flex-y"  :model="updateMsg" :rules="rules2" label-width="80px" ref="updateMsg">
      <div class="checker-tip flex-x">
        <li class="word flex-x">找回密码</li>
        <li class="flex-1"></li>
        <li class="icon-cancel pointer flex-x" @click="setPassword"><i class="el-icon-close"></i></li>
      </div>
      <ul class="flex-y checker-input-box">
        <li>
         <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model="updateMsg.phone"  auto-complete="off"></el-input>
        </el-form-item>
        </li>
        <!-- <li class="flex-1 flex-x"><span>登录手机号</span><div class="flex-1"><input type="text" placeholder="请输入手机号" v-model="updateMsg.phone"></div></li> -->
        <li class="flex-x">
          <!-- <span>验证码</span> -->
        <div class="flex-1 flex-xs" style="margin-top:-15px;">
         <el-form-item label="验证码" prop="checkcode" >
            <el-input class="validate-code" type="text" v-model="updateMsg.checkcode" ></el-input> 
         </el-form-item>
         <!--  <input class="validate-code" type="text" placeholder="请输入短信验证码" v-model="updateMsg.checkcode"> -->
          <div class="get-code flex-x pointer" @click="getCode" v-if='!hasSend'>获取验证码</div>
           <div class="get-code-d flex-x" v-else>({{time}})s重新发送</div>
          </div>
        </li>
       <!--  <el-form-item label="验证码" prop="name">
         <el-input  class="validate-code" type="text" v-model="updateMsg.checkcode"></el-input> 
         <div class="get-code flex-x pointer" @click="getCode" v-if='!hasSend'>获取验证码</div>
          <div class="get-code-d flex-x pointer" v-else>({{time}})s重新发送</div>
       </el-form-item> -->
        <li>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="updateMsg.password"  auto-complete="off"></el-input>
        </el-form-item>
        </li>
        <li>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="updateMsg.password2"  auto-complete="off"></el-input>
        </el-form-item>
        </li>
       <!--  <li class="flex-1 flex-x"><span>设置密码</span><div class="flex-1"><input type="password" placeholder="请输入密码" v-model="updateMsg.password"></div></li>
       <li class="flex-1 flex-x"><span>确认密码</span><div class="flex-1"><input type="password"  placeholder="请输入密码" v-model="updateMsg.password2"></div></li> -->
      </ul>
      <div class="btn-s flex-x">
        <div class="btn-confirm flex-x pointer" @click="confirmSave('updateMsg')">确定</div>
        <div class="btn-cancel flex-x pointer"  @click="setPassword">取消</div>
        <div class="flex-1"></div>
      </div>
      <div class="flex-1"></div>
    </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapActions,mapState } from "vuex";
import { SET_USER_INFO } from "store/actions/type";


export default {
  data() {
      var dataRequired =  (rule, value, callback) => {
        if (value === '') {
          callback(new Error("不能为空"));
        } else {
          /*if (this.dataMsg.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }*/
          callback();
        }

      };
      var phone =  (rule, value, callback) => {
        if (value === '') {
          callback(new Error("不能为空"));
        } else {
          let r= /^1[3456789]\d{9}$/;
          if (!r.test(value)) {
            callback(new Error('手机号不正确'));
          }
          callback();
        }

      };
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.updateMsg.checkPass !== '') {
            this.$refs.updateMsg.validateField('password2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.updateMsg.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      hasSend:false,
      time:60,
      updateMsg:{
        phone:'',
        password:'',
        checkcode:'',
        password2:''

      },
      rules2: {
        phone: [
          { validator: phone, trigger: 'blur' }
        ],
        checkcode: [
          { validator: dataRequired, trigger: 'blur' }
        ],
        password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ],


      },
      setPasswordShow:false,
      form: {
        phone: "",
        password: ""
      },
      rules: {
        appId: [{ required: true, message: "请输入账户名！", trigger: "blur" }]
        // password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
      },
      //请求时的loading效果
      load_data: false
    };
  },
  computed:{
     ...mapState(['user_info'])
  },
  mounted(){
     this.updateMsg.phone = this.user_info.phone;
  },
  methods: {
     confirmSave(formName){
     this.$refs[formName].validate((valid) => {
        if (valid) {
             this.$fetch.api_getData.savePassword(this.updateMsg)
            .then(()=>{
              this.$message({
                  type: 'success',
                  message: '修改成功!'
              });
              this.setPassword();
            })
            .catch((data)=>{
              this.$message.error(data.errors);

            })
        } else {
          
        }
      });

  
    },
    getCode(){
      let r = /^1[3456789]\d{9}$/;
      if(!r.test(this.updateMsg.phone)){
         this.$message({
            type: 'error',
            message: '手机号不正确!'
        });
        return 
      }
      if(this.hasSend){
        return;
      }
        
      this.$fetch.api_getData.getCode({phone:this.updateMsg.phone})
      .then((data)=>{
        this.hasSend = true;
        this.time = 60;
        this.timer();
       
        this.$message({
            type: 'success',
            message: '已发送!'
        });
      })
      .catch((data)=>{
         this.$message({
            type: 'error',
            message: data.errors
        });

      })
    },
    timer(){

      let x = setTimeout(()=>{
        if(this.time>0){
          this.time --;
          this.timer();
        }else{
          this.hasSend = false;
        }
        clearTimeout(x);
      },1000);

    },
    setPassword(){
      this.updateMsg.phone = this.form.phone;
      this.setPasswordShow = !this.setPasswordShow;
    },
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    //提交
    submit_form() {
      
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.load_data = true;

        //登录提交
          this.$fetch.api_getData.login(this.form)
          .then((data) => {
            
            if (data.code == 200) {
              this.set_user_info({
                user: data.results.type,
                phone:data.results.phone,
                login: true
              });
              this.$message.success("登录成功");
              var defaultHomePage = "";
              if(data.results.type== "NORMAL") {// 普通审核员 
                defaultHomePage = "/check/apply";
              
              } else if (data.results.type == "SUPER") {//超级管理员
                defaultHomePage = "/admin/apply";                
              }
              setTimeout(this.$router.push({ path: defaultHomePage }), 500);
            }
            // console.log(data);
          })
          .catch((data) => {

            this.load_data = false;
            this.$message.error(data.errors);
          });
      });
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.find-password{
  width:100px;
  cursor:pointer;
  text-align: center;
  color:#666;
  font-size: 14px;
}
.update-msg{
  
  z-index: 10;
  font-size:16px;
  background: #fff;
  width:623px;
  height: 385px;
  border:1px solid #e6e6e6;
  position: fixed;
  top:50%;
  left:50%;
  margin-top: -190px;
  margin-left: -310px;

  .checker-tip{
    width:100%;

    height: 40px;
    background: #e6e6e6;
    font-weight: bold;
    font-size:14px;
    .icon-cancel{
      margin-right: 10px;
      width:25px;
      height: 25px;
    }
    .word{
      width:114px;
    }

  }
  .checker-input-box{
    color:#adadad;
    width:540px;
    height: 240px;
    margin-top:28px;
    .el-form-item{
      margin-bottom: 0px;
    }
    input{
      width:366px;
      text-indent: 10px;
      height: 40px;
      border:1px solid #d8d8d8;
    }

    li{
      width:100%;

      height: 60px;

    }
    span{
      width:137px;
      text-align: right;
      padding-right: 20px;
      margin-left: 16px;
    }
    .get-code{
      width:113px;
      height: 40px;
     color: #fff;
      border-radius: 5px;
      background: #3fa6fd;
      margin-left: 20px;
    }
    .get-code-d{
      width:113px;
      height: 40px;
     color: #fff;
      border-radius: 5px;
     
      margin-left: 20px;
      background: #666;
    }
  
    .validate-code{
      width:236px;
      input{
        width:236px !important
      }
    }
  }
  .btn-s{
    width:100%;
    margin-top: 20px;
    font-size:15px;

  }
  .btn-confirm{
    width:104px;
    height: 32px;
    background: #fe1b46;
    color: #fff;
    margin-left: 100px;

  }
  .btn-cancel{
    width:68px;
    height: 32px;
    background: #fff;
    color:#333;
    margin-left: 20px;
    border:1px solid #eee;
  }
}
.login-body {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(./images/login_bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .loginWarp {
    width: 300px;
    padding: 125px 15px 25px;
    margin: 100px auto;
    background-color: #fff;
    border-radius: 5px;
    position: relative;

    .login-title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      height: 80px;
      line-height: 80px;
      background: #ff5555;
      color: #fff;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
    }
    .login-item {
      .el-input__inner {
        margin: 0 !important;
      }
    }
    .form-input {
      input {
        margin-bottom: 15px;
        font-size: 12px;
        height: 40px;
        border: 1px solid #eaeaec;
        background: #eaeaec;
        border-radius: 5px;
        color: #555;
      }
    }
    .form-submit {
      width: 100%;
      color: #fff;
      border-color: #6bc5a4;
      background: #6bc5a4;
      &:active,
      &:hover {
        border-color: #6bc5a4;
        background: #6bc5a4;
      }
    }
  }
}
</style>
