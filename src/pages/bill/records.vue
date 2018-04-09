<template>
	<div class="bill">
		<div class="flex-x" style="background:#fff;margin-bottom:20px;">
			
		  <el-button type="primary" size="small" @click="goback" style="padding:10px 15px;">返回</el-button>
		  <div class="flex-1"></div>
		</div>
		<div class="flex-x" style="margin-bottom:20px;">
		 	<el-date-picker
	      v-model="startTime"
	      type="date"
	      placeholder="选择日期">
	    </el-date-picker>
	    <span style="margin:0 10px;color:#ccc;">—</span>
	    <el-date-picker
	      v-model="endTime"
	      type="date"
	      placeholder="选择日期">
	    </el-date-picker>
			<el-button type="primary" @click="onSubmit" style="margin:0 20px;">搜索</el-button>
			  
			<div class="flex-1"></div>
			<div style="border:1px solid #fe1b46;background:#fff;color:#333;width:620px;height:50px;line-height:50px;text-indent:30px;">
				<span>账户余额：</span><span style="color:#fe1b46;">￥{{account}}</span>
			</div>

		</div>
	
		<div class="list">
			<el-table :data="recordsList" ref="table" v-loading="load_data" :stripe=true element-loading-text="拼命加载中" style="width: 100%;">
			 

			    <el-table-column label="时间" min-width="100">
				
					<template slot-scope="props">
			        <span>{{props.row.createTime}}</span>
			      </template>
			    </el-table-column>
			     <el-table-column prop="number" label="交易项" min-width="100">
			     <template slot-scope="props">
			        <span>{{props.row.serviceCn}}</span>
			      </template>
			     </el-table-column>
			    <el-table-column prop="name" label="收支" min-width="100">
			     	<template slot-scope="props">
			        <span v-if="props.row.unit == '+'" style="color:rgb(254, 27, 70);">{{props.row.unit}}{{props.row.amount}}</span>
			        <span v-else>{{props.row.unit}}{{props.row.amount}}</span>

			      </template>
			     </el-table-column>
			    <el-table-column prop="name" label="动态余额" min-width="100">
			     	<template slot-scope="props">
			        <span style="color:rgb(254, 27, 70);">￥{{props.row.cashAmoount}}</span>
			      </template>
			     </el-table-column>
		    </el-table>
		</div>
		<div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentValue"
	      :page-size="10"
	      layout="prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
	  </div>
	</div>
</template>
<script type="text/javascript">

import {mapGetters,mapState} from "vuex"
import * as type from "src/store/getters/type"

export default {
  data() {
    return {
    	total:10,
    	currentValue:1,
    	deliveryCompany:1,
    	startTime:1,
    	endTime:1,
    	account:null,
    	merchantPhone:null,
    	merchantId:null,
    	load_data:false,
    	companyList:[{value:1,label:'蜂鸟'}],
    	value9: '',
    	recordsList:[],
    	merchantList:[{
    		id:'12',
    		time:'2017-1',
    		number:'123',
    		money:12,
    		logo:'https://ps.ssl.qhimg.com/dm/196_123_/t01287a472181234899.jpg',
    		name:'可第七',
    		delivery:"丰年"
    	}]
      
    };
  },
  computed:{
    
  },
  mounted(){
  	this.merchantId = this.$route.query.id;
  	this.merchantPhone = this.$route.query.phone;
  	var _endTime = new Date();
  	var _startTime = _endTime.getTime() - 30*24*60*60*1000;
  	this.startTime = new Date(_startTime);
  	this.endTime = _endTime;

  	this.getList();
  	this.getAccount();
    
  },
  methods: {
  	 handleSizeChange(){
    },
    handleCurrentChange(current){
      this.getList(current,this.status);
    },
    timeFormcat(_time){
      var time = {};
      var oDate = new Date(_time);
      time.year = oDate.getFullYear();   //获取系统的年；
      time.month = oDate.getMonth()+1<10?'0'+(oDate.getMonth()+1):oDate.getMonth()+1;   //获取系统月份，由于月份是从0开始计算，所以要加1
      time.day = oDate.getDate()<10?'0'+oDate.getDate():oDate.getDate(); // 获取系统日，
      time.hour = oDate.getHours()<10?'0'+oDate.getHours():oDate.getHours(); //获取系统时，
      time.min = oDate.getMinutes()<10?'0'+oDate.getMinutes():oDate.getMinutes(); //分
      time.second = oDate.getSeconds()<10?'0'+oDate.getSeconds():oDate.getSeconds(); //秒
      return time;
  	},
    getList(current,type,content){
    	//merchantId=&startTime=&endTime=&status=
    	var _startTime = this.timeFormcat(this.startTime);
    	var _endTime = this.timeFormcat(this.endTime);
  		var params = {
  			size:10,
  			current:current||1,
  			startTime:_startTime.year+"-"+_startTime.month+"-"+_startTime.day,
  			endTime:_endTime.year+"-"+_endTime.month+"-"+_endTime.day+" 23:59:59",
  			merchantId:this.merchantId

  		}
  		if(type){
  			params.type = type;
  		}
  		if(content){
  			params.content = content;
  		}
  		this.$fetch.api_getData.getRecords(params)
  		.then((res) => {
  			this.recordsList = res.results.records;
  		})
  		.catch((res) => {

  		})

  	},
  	goback(){
  		this.$router.back();
  	},
  	getAccount(){
    	this.$fetch.api_getData.getAccount({merchantPhone:this.merchantPhone})
    	.then((res) => {
    		this.account = res.results.amount*0.01?(res.results.amount*0.01).toFixed(2):'0.00';
  		})
  		.catch((res) => {
  			this.$message({
            type: 'info',
            message:res.errors
          });
  		})
    },
  	onSubmit(){
  		this.getList(1);

  	},
  	handleDelete(index){},
    
    
   
    
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.bill{
	.records-btn{
		background: #fff;
		span{
			height: 40px;
			line-height: 40px;
			color:#333;
			margin-left: 30px;
			font-size:14px;
		}
		.selected{
			color:#ff3c42;
		}
	}
}

</style>
