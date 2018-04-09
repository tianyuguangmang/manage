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
			<el-select v-if="stateList&&stateList.length>0" v-model="transState" placeholder="请选择" style="width:130px;height:40px;" filterable :filter-method="selectState">
		    <el-option
		      v-for="item in stateList"
		      :key="item.code"
		      :label="item.name"
		      :value="item.code">
		    </el-option>
			</el-select>

			  
			<div class="flex-1"></div>
			<div style="border:1px solid #fe1b46;background:#fff;color:#333;width:620px;height:50px;line-height:50px;text-indent:30px;">
				<span>账户余额：</span><span style="color:#fe1b46;">￥{{account}}</span>
			</div>

		</div>
		<div class="flex-x records-btn" style="background:#fff;margin-bottom:20px;">
			
		  <span :class="state == 1?'selected':''" @click="tabchange(1)">充值记录</span><span :class="state == 2?'selected':''" @click="tabchange(2)">消费记录</span>
		  <div class="flex-1"></div>
		</div>
		<div class="list" v-show="state == 1">
			<el-table :data="dataList_1" ref="table" v-loading="load_data" :stripe=true element-loading-text="拼命加载中" style="width: 100%;">
			   

			    <el-table-column prop="createTime" label="充值时间" min-width="100"></el-table-column>
			     <el-table-column prop="transOrderId" label="账单号" min-width="100"></el-table-column>
			    <el-table-column prop="name" label="充值金额" min-width="100">
			     	<template slot-scope="props">
			        <span style="color:rgb(254, 27, 70);">￥{{props.row.amount}}</span>
			      </template>
			     </el-table-column>
			    <el-table-column prop="name" label="余额" min-width="100">
			     	<template slot-scope="props">
			        <span style="color:rgb(254, 27, 70);">￥{{props.row.cashAmount}}</span>
			      </template>
			     </el-table-column>
			    <el-table-column prop="transMethodName" label="充值方式" width="180">
					<!-- <template slot-scope="props">
									      {{$dateFormat(parseInt(props.row.createTime)*1000,"yyyy-MM-dd hh:mm:ss")}}
									    </template> -->
			    </el-table-column>
			    <el-table-column prop="delivery" label="状态" >
					<template slot-scope="props">
			        <span v-if="props.row.transStatus == 'TRANS_PAY_SUCCESS'">充值成功</span>
			        <span v-else style="color:rgb(254, 27, 70);">充值失败</span>
			      </template>
			    </el-table-column>
			   
		    </el-table>
		    <div class="block">
		    <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="currentValue1"
		      :page-size="10"
		      layout="prev, pager, next, jumper"
		      :total="total1">
		    </el-pagination>
		  </div>
		</div>
		<div class="list" v-show="state == 2">
			<el-table :data="dataList_2" ref="table" v-loading="load_data" :stripe=true element-loading-text="拼命加载中" style="width: 100%;">
			    <el-table-column  prop="createTime" label="扣费时间" width="100">
			      <!-- <template slot-scope="props">
			        <img :src="props.row.mainPic" alt="" style="width:70px;height:70px">
			      </template> -->
			    </el-table-column>

			    <el-table-column prop="tradeId" label="配送单号" min-width="100"></el-table-column>
			     <el-table-column  label="配送货品" min-width="100">
			     	<template slot-scope="props">
			     	
			         <div v-for="item in props.row.orderList" class="flex-x" style="width:90%;">
			        	<span>{{item.caption}}</span><span class="flex-1"></span><span style="margin-left:10px;min-width:30px;">x{{item.num}}</span>
			        </div>
			      </template>
			     </el-table-column>
			    <el-table-column prop="name" label="订单配送时间" min-width="100">
			     	<template slot-scope="props">
			        <span>{{props.row.sendTime}}</span>
			      </template>
			     </el-table-column>
			    <el-table-column label="配送完成时间" min-width="100">
			     	<template slot-scope="props">
			        <span>{{props.row.finishTime}}</span>
			      </template>
			     </el-table-column>
			     <el-table-column label="扣款金额" min-width="100">
			     	<template slot-scope="props">
			        <span>￥{{props.row.amount}}</span>
			      </template>
			     </el-table-column>
			    <el-table-column prop="delivery" label="扣款状态" width="180">
					<template slot-scope="props">
			        <span v-if="props.row.transStatus == 'TRANS_PAY_SUCCESS'">已完成</span>
			        <span v-else style="color:rgb(254, 27, 70);">未完成</span>
			      </template>
			    </el-table-column>
			   
			   
		    </el-table>
		    <div class="block">
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentValue2"
	      :page-size="10"
	      layout="prev, pager, next, jumper"
	      :total="total2">
	    </el-pagination>
	  </div>
		</div>
		
	</div>
</template>
<script type="text/javascript">

import {mapGetters,mapState} from "vuex"
import * as type from "src/store/getters/type"
 
export default {
  data() {
    return {
    	state:1,
    	merchantPhone:null,
    	total1:10,
    	total2:20,
    	transState:'ALL',
    	load_data:false,
    	currentValue1:1,
    	currentValue2:1,
    	account:0,
    	stateList:[{name:'全部',code:'ALL'},{name:'充值成功',code:'TRANS_PAY_SUCCESS'},{name:'充值失败',code:'TRANS_PAY_FAIL'}],
    	value9: '',
    	startTime:'',
    	endTime:'',
    	dataList_1:[],
    	dataList_2:[],
    	merchantList:[{
    		id:'12',
    		time:'2017-1',
    		number:'123',
    		money:12,
    		logo:'https://ps.ssl.qhimg.com/dm/196_123_/t01287a472181234899.jpg',
    		name:'可第七',
    		delivery:"丰年"
    	}],
    	consumeList:[{
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

  	/*this.getState();*/
  	this.getAccount();
    
  },
  methods: {
  	selectState(){
  		if(this.transState){
  			this.getList();

  		}
  	},
  	tabchange(state){
  		this.state = state;
  		this.transState = 'ALL';
  		if(this.state == 2){
  			this.stateList = [{name:'全部',code:'ALL'},{name:'已完成',code:'TRANS_PAY_SUCCESS'},{name:'未完成',code:'TRANS_PAY_FAIL'}];
  		}
  		else{
  			this.stateList = [{name:'全部',code:'ALL'},{name:'充值成功',code:'TRANS_PAY_SUCCESS'},{name:'充值失败',code:'TRANS_PAY_FAIL'}];
  		}
  		this.getList(1);
  	},
  	 handleSizeChange(){
     
    },
    handleCurrentChange(current){
    	this.getList(current);
     
    },
    /**
     * 账户资金
     * @return {[type]} [description]
     */
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
    /**
     * 数据列表
     * @param  {[type]} current [description]
     * @return {[type]}         [description]
     */
    getList(current){
    	var _startTime = this.timeFormcat(this.startTime);
    	var _endTime = this.timeFormcat(this.endTime);
  		var params = {
  			size:10,
  			current:current||1,
  			merchantId:this.merchantId,
  			type:this.state==2?0:1,
  			startTime:_startTime.year+"-"+_startTime.month+"-"+_startTime.day,
  			endTime:_endTime.year+"-"+_endTime.month+"-"+_endTime.day+" 23:59:59",
  		}
  		if(this.transState !='ALL'){
  			params.status = this.transState;
  		}
  		
  		this.$fetch.api_getData.getBillDetail(params)
  		.then((res) => {
  			this['dataList_'+this.state] = res.results.data;
  			this["currentValue"+this.state] = current||1;
  			this["total"+this.state] = res.results.total;
  		})
  		.catch((res) => {
  			this.$message({
            type: 'info',
            message:res.errors
          });
  		})

  	},
  	/**
  	 * 状态列表
  	 * @return {[type]} [description]
  	 */
  	getState(){
  		this.$fetch.api_getData.getStateList()
  		.then((res) => {
  			this.stateList = res.results;
  			this.transState = res.results[0].code;
  			

  		})
  		.catch((res)=>{
  		  this.$message({
            type: 'info',
            message:res.errors
          });
  		})
  	},
  	goback(){
  		this.$router.back();
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
			cursor: pointer;
		}
		.selected{
			color:#ff3c42;
		}
	}
}

</style>
