<template>
  <div>
     <div class="btn-back flex-xs"><span class="flex-x pointer" @click="goback">返回</span></div>
   	
 	<ul class="input-box flex-y" v-if="dataMsg">
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>模板名称</span><div class="value" ><span v-if="templateInfo">{{templateInfo.name}}</span></div></li>
 		<li class="flex-xss tem-img"><span class="key flex-x"><div class="flex-1"></div><i>*</i>模板图片</span><div class="value">
 		<div class="up-img" ><div class="" v-if="templateInfo"><img :src="templateInfo.mainPic" alt=""></div></div></div></li>
 	
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>注册手机号</span><div class="value">{{dataMsg.phone}}</div></li>
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>AppID(小程序ID)</span><div class="value">{{dataMsg.appId}}</div></li>
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>AppSecret(小程序密钥)</span><div class="value">{{dataMsg.appSecret}}</div></li>
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>支付商户号</span><div class="value">{{dataMsg.mid}}</div></li>
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>支付API密钥</span><div class="value">{{dataMsg.payKey}}</div></li>
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>安全证书</span>
 			<div class="value" v-if="templateInfo&&templateInfo.certificate">已上传</div>
 			<div class="value" v-else>未上传</div>
 			</li>
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>支付page</span><div class="value"><span v-if="templateInfo">{{templateInfo.payPage}}</span></div></li>
<!--  		<li class="flex-xss security-box"><span class="key flex-x"><div class="flex-1"></div><i>*</i>商户管理者微信号</span><div class="value">已上传</div></li> -->
 		<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>支付方式</span><div class="value">{{dataMsg.payWay}}</div></li>
 	<!-- 	<li class="flex-xss"><span class="key flex-x"><div class="flex-1"></div><i>*</i>设置体验者</span><div class="value flex-xs"><span class="bind-num flex-xs">可绑定15个</span><div class="bind-btn flex-x">添加体验者</div></div></li>
 	<div class="save-msg flex-xs"><span class="pointer flex-x" @click="addTemplate">保存</span></div> -->

 	</ul>
 	<div class="no-data" style="margin-top:20px;height:800px;" v-else><div style="height:100px;" class="flex-x">暂无数据</div></div>


  
  </div>
</template>
<script type="text/javascript">
import { mapActions } from "vuex";


export default {
  data() {
    return {
    	dataMsg:null,
    	templateInfo:null
      
    };
  },
  mounted(){
  	
  	let id = this.$route.query.id;
  	let transId = this.$route.query.transId;

  	this.$fetch.api_getData.getPayDetail({transId:transId})
  	.then((data) => {
  		if(data.results.merchant !== null){
  			this.dataMsg = data.results.merchant;
  			this.dataMsg.payWay = data.results.payWay;
  		}
  		if(data.results.templateInfo){
  			this.templateInfo = data.results.templateInfo;
  		}
  	


  	})
  	.catch((data)=>{

  	})
  },
  methods: {
  	goback(){
  		this.$router.back();
  	},
  	uploadCover(){
  		let _this = this;
  		let  x = this.$fetch.api_file.imgUpload(this,1,function(that,data){
  			
  			_this.dataMsg.mainPic = data;
  		});
  		x.chooseFile();
  	},
  	uploadCertificate(){
  		let _this = this;
	 	let  x = this.$fetch.api_file.imgUpload(this,1,function(that,data){
			_this.dataMsg.certificate.url = data;
  		});
  		x.chooseFile();

  	},
  	addTemplate(){
  		this.$fetch.api_getData.addTemplate(this.dataMsg)
  		.then((data)=>{


  		})
  		.catch(()=>{

  		})
  	},
    
   
    
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

	.btn-back{
		background: #fff;
		height: 50px;
		text-indent: 20px;
		font-size:16px;

	}
	.input-box{
		margin-top: 20px;
		width:100%;
		color:#666;
		font-size: 14px;
		background: #fff;
		padding-bottom: 78px;
		.save-msg{
			height: 42px;
			margin-top: 40px;
			width:100%;
			span{
				width:124px;
				height: 42px;
				background: #ff1c45;
				color: #fff;
				border-radius: 5px;
				margin-left: 220px;
			}
		}
		li{
			height:30px;
			width:100%;
			margin-top: 30px;

			.key{
				width:220px;
				text-align: right;
				line-height: 30px;
				height: 30px;
				padding-right: 30px;
				i{
					color: #f65a64;
					margin-right: 4px;
					margin-top: 5px;
					font-size:20px;
				}
			}
			.value{
				width:344px;
				height: 30px;
				line-height: 30px;
				
				input{
					border:1px solid #c7c7c7;
					width:100%;
					height: 100%;
				}
				.tip span{
					color: #f65a64;
				}
				.security{
					width:240px;
					height: 240px;
					border:1px solid #e8e9ed;
					background: #f8f9fc;
				}
				.bind-num{
					width:110px;

				}
				.bind-btn{
					width:120px;
					height: 42px;
					border-radius: 5px;
					background:#3fa6fd;
					color: #fff;

					margin-left: 20px;
				}
			}
		}
		.tem-img{
			height: 110px;
		}
		.security-box{
			height: 240px;
		}
	}

</style>
