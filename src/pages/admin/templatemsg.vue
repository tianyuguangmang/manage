<template>
	<div>
		<div class="btn-back flex-xs">
			<div class="flex-x pointer go-back" @click="goback">返回</div>
		</div>
		<el-form class="input-box flex-y" :rules="rules" label-width="250px" ref="dataMsg" :model="dataMsg">
			<li>
				<el-form-item label="模板名称" prop="name">
					<el-input style="width:350px;" v-model="dataMsg.name"></el-input>
				</el-form-item>
			</li>
			<li class="tem-img">
				<el-form-item label="模板图片">
					<div class="value">
						<div class="up-img" @click="uploadCover">
              <img v-if="dataMsg.mainPic!=''" :src="dataMsg.mainPic" alt="">
              <i v-else class="el-icon-plus up-icon"></i>
            </div>
					</div>
				</el-form-item>
			</li>
			<li class="flex-xss">
				<span class="key flex-x"></span>
				<div class="value">
					<div class="tip">图片支持jpg,jpeg,png,bmp格式,
						<span>200*200</span>像素</div>
				</div>
			</li>
			<li>
				<el-form-item label="是否可售" prop="">
					<el-select v-model="dataMsg.isSell" size="small" style="width:150px" @change="sellStatusChange">
						<el-option v-for="(item, index) in sellStatusList" :key="'sellStatus_'+index" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</li>
			</el-select>
			<li v-if="dataMsg.isSell">
				<el-form-item label="模板价格" prop="unitPrice">
					<el-input style="width:350px;" v-model="dataMsg.unitPrice"></el-input>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="测试商户号" prop="">
          <span  v-if="dataMsg.phone">{{dataMsg.phone}}</span>
					<el-button v-else type="primary" @click="showTestMerchant">添加测试商户号</el-button>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="支付功能" prop="">
					<el-select v-model="dataMsg.isPay" size="small" style="width:150px" @change="payStatusChange">
						<el-option v-for="(item, index) in payStatusList" :key="'payStatus_'+index" :label="item.name" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="AppID(小程序ID)" prop="appId">
					<el-input style="width:350px;" v-model="dataMsg.appId"></el-input>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="AppSecret(小程序密钥)" prop="appSecret">
					<el-input style="width:350px;" v-model="dataMsg.appSecret"></el-input>
				</el-form-item>
			</li>
			<li v-if="dataMsg.isPay">
				<el-form-item label="支付商户号" prop="mid">
					<el-input style="width:350px;" v-model="dataMsg.mid"></el-input>
				</el-form-item>
			</li>
			<li v-if="dataMsg.isPay">
				<el-form-item label="支付API密钥" prop="payKey">
					<el-input style="width:350px;" v-model="dataMsg.payKey"></el-input>
				</el-form-item>
			</li>
			<li class="security-box" v-if="dataMsg.isPay">
				<el-form-item label="安全证书">
					<div class="value">
						<div class="security" @click="uploadCertificate">{{dataMsg.certificate.name}}</div>
					</div>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="小程序页面首页" prop="templateIndex">
					<el-input style="width:350px;" v-model="dataMsg.templateIndex"></el-input>
				</el-form-item>
			</li>
			<li v-if="dataMsg.isPay">
				<el-form-item label="支付page" prop="payPage">
					<el-input style="width:350px;" v-model="dataMsg.payPage"></el-input>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="测试商家MID" prop="testPlatformMid">
					<el-input style="width:350px;" v-model="dataMsg.testPlatformMid"></el-input>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="线上测试商家MID" prop="proPlatformMid">
					<el-input style="width:350px;" v-model="dataMsg.proPlatformMid"></el-input>
				</el-form-item>
			</li>
			<li v-if="ids&&expList.length<15">
				<el-form-item label="设置体验者">
					<div class="value flex-xs">
						<span class="bind-num flex-x" style="margin-top:5px">可绑定15个</span>
						<div class="bind-btn flex-x" @click="setShowExperience">添加体验者</div>
					</div>
				</el-form-item>
			</li>
			<div class="flex-xss ex-list-box" v-if="ids">
				<span class="key flex-x"></span>
				<div class="value">
					<ul class="ex-list" v-if="expList&&expList.length>0">
						<div class="item flex-x" v-for="(item,index) in expList">
							<div class="avator-box flex-x">
								<img :src="dataMsg.certificate.url" />
							</div>
							<div class="flex-y item-msg">
								<div class="name flex-x">
									<span class="">微信名称：</span>
									<span class="">{{item.wechatId}}</span>
								</div>
								<div class="time flex-x">
									<span class="">绑定时间：</span>
									<span class="">{{item.time}}</span>
								</div>
								<div class="cancel-bind flex-x" @click="cancelExperience(item.wxchatId)">解除绑定</div>
							</div>
						</div>
					</ul>
				</div>
			</div>
			<div class="save-msg flex-xs">
				<span class="pointer flex-x" @click="addTemplate('dataMsg')">保存</span>
			</div>
		</el-form>
		<div class="cover" v-if="showExperience"></div>
		<div class="update-msg flex-y" v-if="showExperience">
			<div class="checker-tip flex-x">
				<li class="word flex-x">添加体验者</li>
				<li class="flex-1"></li>
				<li class="icon-cancel pointer flex-x" @click="setShowExperience"><i class="el-icon-close"></i></li>
			</div>
			<div class="flex-x" style="height:60px;">请输入要绑定的微信号</div>
			<div class="flex-x">
				<el-input type="text" placeholder="请输入微信号" v-model="wxNumber" style="width:350px;"></el-input>
			</div>
			<div class="" style="height:30px;color:#999;font-size:12px;width:350px;margin-top:20px;">你还可以绑定{{15-expList.length}}体验者。</div>

			<!-- <ul class="flex-y checker-input-box" style="height:200px">
				<li class="flex-1 flex-x" style="height:50px;">请输入需要绑定的微信号</li>	
				<li class="flex-1 flex-x" style="height:50px;"><input type="text"  placeholder="请输入微信号" v-model="wxNumber"></li>
			</ul> -->

			<div class="btn-s flex-x" style="margin-top:100px;">
				<div class="btn-confirm flex-x pointer" @click="confirmSave">确定</div>
				<div class="btn-cancel flex-x pointer" @click="setShowExperience">取消</div>
				<div class="flex-1"></div>
			</div>
			<div class="flex-1"></div>
		</div>
		<div class="cover" v-if="testMerchantDialog"></div>
		<div class="update-msg flex-y" v-if="testMerchantDialog">
			<div class="checker-tip flex-x">
				<li class="word flex-x">添加体验者</li>
				<li class="flex-1"></li>
				<li class="icon-cancel pointer flex-x" @click="showTestMerchant"><i class="el-icon-close"></i></li>
			</div>
			<el-form class="input-box flex-y" :rules="testMerchantRules" label-width="100px" ref="testMerchant" :model="testMerchant">
				<li>
					<el-form-item label="手机号" prop="phone">
						<el-input style="width:370px;" v-model="testMerchant.phone" placeholder="请输入手机号"></el-input>
					</el-form-item>
				</li>
				<li>
					<el-form-item label="设置密码" prop="password">
						<el-input style="width:370px;" v-model="testMerchant.password" type="password" placeholder="请输入6-20位英文字母、数字或字符，字母区分大小写"></el-input>
					</el-form-item>
				</li>
				<li>
					<el-form-item label="确认密码" prop="confirmPwd">
						<el-input style="width:370px;" v-model="testMerchant.confirmPwd" type="password" placeholder="请确认密码"></el-input>
					</el-form-item>
				</li>
			</el-form>
			<div class="btn-s flex-x" style="margin-top:-20px;">
				<div class="btn-confirm flex-x pointer" @click="saveTestMerchant('testMerchant')">确定</div>
				<div class="btn-cancel flex-x pointer" @click="showTestMerchant">取消</div>
				<div class="flex-1"></div>
			</div>
			<div class="flex-1"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { mapActions } from "vuex";
import { addMerchantUrl } from "../../api/url";
import { tools_verify } from "common/tools";

export default {
  data() {
    var dataRequired = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("不能为空"));
      } else {
        /*if (this.dataMsg.checkPass !== '') {
					this.$refs.ruleForm2.validateField('checkPass');
				}*/
        callback();
      }
    };
    var validatePrice = (rule, value, callback) => {
      if (parseFloat(value) <= 0) {
        return callback(new Error("价格必须大于0"));
      } else if (!tools_verify.isPrice(value)) {
        return callback(new Error("请输入小数位最多两位的正数"));
      } else {
        callback();
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (value !== this.testMerchant.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      payStatusList: [
        { name: "需要", value: 1 },
        { name: "不需要", value: 0 }
      ],
      sellStatusList: [
        { name: "可销售", value: 1 },
        { name: "不可销售", value: 0 }
      ],
      testMerchantDialog: false,
      testMerchant: {
        phone: "",
        password: "",
        confirmPwd: ""
      },
      testMerchantRules: {
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^(((1[34578]{1}[0-9]{1}))+\d{8})$/,
            message: "请输入正确的电话号码",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符" },
          {
            pattern: /^[\da-zA-Z!"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~]+$/,
            message: "密码格式不对",
            trigger: "blur"
          }
        ],
        confirmPwd: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" }
        ],
      },
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        email: ""
      },
      ids: "",
      showExperience: false,
      wxNumber: "",
      expList: [],
      rules: {
        unitPrice: [{required: true, message: "不能为空", trigger: "blur"}, { validator: validatePrice, trigger: "blur" }],
        name: [{ validator: dataRequired, trigger: "blur" }],
        mainPic: [{ validator: dataRequired, trigger: "blur" }],
        appId: [{ validator: dataRequired, trigger: "blur" }],
        appSecret: [{ validator: dataRequired, trigger: "blur" }],
        mid: [{ validator: dataRequired, trigger: "blur" }],
        payKey: [{ validator: dataRequired, trigger: "blur" }],
        templateIndex: [{ validator: dataRequired, trigger: "blur" }],
        testPlatformMid: [{ validator: dataRequired, trigger: "blur" }],
        proPlatformMid: [{ validator: dataRequired, trigger: "blur" }],
        payPage: [{ validator: dataRequired, trigger: "blur" }]
      },
      dataMsg: {
        isPay: 1,
        isSell: 1,
        unitPrice: "",
        phone: null,
        name: "", //模板名称
        mainPic: "", //模板图片
        appId: "", //小程序appid
        appSecret: "", //应用密钥
        certificate: {
          url: "", //证书名称
          name: "" //证书url
        },
        mid: "", //商户号
        payKey: "", //支付key
        payPage: "", //支付页面
        testPlatformMid: "", //测试mid
        proPlatformMid: "", //线上测试mid
        templateIndex: "" //首页
      }
    };
  },
  mounted() {
    let id = this.$route.query.id;
    console.log(id);
    if (id) {
      this.ids = id;
      this.getTemplateDetail();
    }
  },
  methods: {
    getTemplateDetail() {
      if (this.ids) {
        this.$fetch.api_getData
          .getTemplateDetail({ id: this.ids })
          .then(data => {
            this.dataMsg = data.results;
            this.dataMsg.certificate = JSON.parse(this.dataMsg.certificate);
            this.dataMsg.expList = typeof data.results.testerInfo === "string" ? JSON.parse(data.results.testerInfo) : data.results.testerInfo;
          })
          .catch(data => {});
      }
    },
    cancelExperience(wxNumber) {
      this.$confirm("您确定要解除绑定吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$fetch.api_getData
          .cancelExperience({
            id: this.ids,
            appId: this.dataMsg.appId,
            wxchatId: wxNumber
          })
          .then(data => {
            this.getTemplateDetail();
          })
          .catch(data => {
            this.$message({
              type: "info",
              message: data.errors
            });
          });
      });
    },
    confirmSave() {
      if (!this.wxNumber) {
        this.$message({
          type: "info",
          message: "请输入微信号"
        });
        return;
      }
      this.$fetch.api_getData
        .bindExperience({
          id: this.ids,
          appId: this.dataMsg.appId,
          wxchatId: this.wxNumber
        })
        .then(data => {
          this.getTemplateDetail();
        })
        .catch(data => {
          if (data.code == 584) {
            let authUrl = data.results;
            console.log(authUrl);
            this.$confirm("需要授权, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                window.open(authUrl);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消授权"
                });
              });
          } else {
            this.$message({
              type: "error",
              message: data.errors
            });
          }
        });
    },
    setShowExperience() {
      this.showExperience = !this.showExperience;
    },
    goback() {
      this.$router.back();
    },
    uploadCover() {
      let _this = this;
      let x = this.$fetch.api_file.imgUpload(this, 1, function(that, data) {
        _this.dataMsg.mainPic = data;
      });
      x.chooseFile();
    },
    uploadCertificate() {
      let _this = this;
      let x = this.$fetch.api_file.fileUpload(this, function(task) {
        _this.dataMsg.certificate.name = task._file.name;
        _this.dataMsg.certificate.url = "https://img.chuanshangjia.com/" + task._result.hash;
      });
      x.chooseFile();
    },
    addTemplate(formName) {
      if(!this.dataMsg.mainPic) {
        this.$message.error("请添加模版图片");
        return false;
      }
      if(!this.dataMsg.phone) {
        this.$message.error("请添加测试商户号");
        return false;
      }
      if(this.dataMsg.isPay==1&&this.dataMsg.certificate.url=="") {
        this.$message.error("请添加安全证书");
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this.dataMsg)
          this.$fetch.api_getData
            .addTemplate(this.dataMsg)
            .then(data => {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.replace({ name: "template" });
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "添加失败!"
              });
            });
        } else {
          return false;
        }
      });
    },
    //修改售卖选项
    sellStatusChange(value) {
      console.log(value)
      if (value==0) {
        this.dataMsg.unitPrice = "";
      }
    },
    //修改支付选项
    payStatusChange(value) {
      if (value==0) {
        this.dataMsg.mid = "";
        this.dataMsg.payKey = "";
        this.dataMsg.payPage = "";
        this.dataMsg.certificate = {
          url: "",
          name: ""
        };
      }
    },
    //设置测试商户号
    showTestMerchant() {
      this.testMerchantDialog = !this.testMerchantDialog;
      this.testMerchant = {
        phone: "",
        password: "",
        confirmPwd: ""
      }
    },
    //
    saveTestMerchant() {
      let form = Object.assign({}, this.testMerchant);
      delete form.confirmPwd;
      this.$refs.testMerchant.validate(valid => {
        
        if (valid) {
          axios({
            method: "post",
            url: addMerchantUrl,
            data: form
          })
            .then(({ data }) => {
              if (data.code==200) {
                this.dataMsg.phone = this.testMerchant.phone;
                this.dataMsg.proPlatformMid = data.results;
                this.testMerchantDialog = false;
              } else {
                this.$message(data.errors);                                 
              }
            })
            .catch(() => {
                this.$message("添加测试商户号失败");
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.go-back {
  width: 60px;
  height: 30px;
  padding-right: 20px;
  background: #ff3c42;
  color: #fff;
  margin-left: 20px;
  border-radius: 4px;
}
.ex-list-box {
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 350px;

  .avator-box {
    width: 108px;
    height: 108px;
    img {
      border-radius: 54px;
      width: 100%;
      height: 100%;
    }
  }
  .ex-list {
    .item {
      margin-right: 100px;
      float: left;
    }
  }
  .item-msg {
    margin-left: 20px;
    div {
      height: 30px;
    }
  }
  .cancel-bind {
    width: 100px;
    border: 1px solid #d8d8d8;
    color: #ff5f75;
    cursor: pointer;
  }
}
.btn-back {
  background: #fff;
  height: 50px;

  font-size: 16px;
}
.input-box {
  margin-top: 20px;
  width: 100%;
  color: #666;
  font-size: 14px;
  background: #fff;
  padding-bottom: 78px;
  .save-msg {
    height: 42px;
    margin-top: 40px;
    width: 100%;
    span {
      width: 124px;
      height: 42px;
      background: #ff1c45;
      color: #fff;
      border-radius: 5px;
      margin-left: 220px;
    }
  }
  li {
    height: 30px;
    width: 100%;
    margin-top: 30px;

    .key {
      width: 220px;
      text-align: right;
      line-height: 30px;
      height: 30px;
      padding-right: 30px;
      i {
        color: #f65a64;
        margin-right: 4px;
        margin-top: 5px;
        font-size: 20px;
      }
    }
    .value {
      width: 344px;
      height: 30px;

      input {
        border: 1px solid #c7c7c7;
        width: 100%;
        height: 100%;
      }
      .up-img {
        width: 110px;
        height: 110px;
        line-height: 110px;
        border: 1px solid #e8e9ed;
        .up-icon {
          font-size: 14px;
          color: #8c939d;
          width: 100%;
          height: 100%;
          text-align: center;
        }
      }
      .tip span {
        color: #f65a64;
      }
      .security {
        width: 240px;
        height: 240px;
        border: 1px solid #e8e9ed;
        background: #f8f9fc;
      }
      .bind-num {
        width: 110px;
      }
      .bind-btn {
        width: 120px;
        height: 42px;
        border-radius: 5px;
        background: #3fa6fd;
        color: #fff;
        cursor: pointer;
        margin-left: 20px;
      }
    }
  }
  .tem-img {
    height: 110px;
  }
  .security-box {
    height: 240px;
  }
}
</style>
