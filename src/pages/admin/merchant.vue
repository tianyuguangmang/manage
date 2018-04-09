<template>
	<div class="merchant">
		<div class="flex-x">
			<el-select v-model="deliveryCompany" placeholder="请选择" style="width:210px;height:40px;" filterable :filter-method="selectDelivery">
		    <el-option
		      v-for="item in companyList"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		  <el-input style="width:307px;height:40px;margin-left:30px;font-size:14px;" v-model="merchantId" placeholder="请输入商家编号或商家名称进行搜索"></el-input>
		  <el-button type="primary" @click="onSubmit" style="margin-top:-6px;">搜索</el-button>
		  <div class="flex-1"></div>
		</div>
		<div class="list">
			<el-table :data="merchantList" ref="table" v-loading="load_data" :stripe=true element-loading-text="拼命加载中" style="width: 100%;">
			    <el-table-column  prop="merchantId" label="商家编号" width="100">
			      <!-- <template slot-scope="props">
			        <img :src="props.row.mainPic" alt="" style="width:70px;height:70px">
			      </template> -->
			    </el-table-column>

			    <el-table-column prop="storeDeliveryCreateTime" label="接入时间" min-width="100"></el-table-column>
			    <el-table-column label="商家logo" min-width="100">
					<template slot-scope="props">
			        <img :src="props.row.logo" alt="" style="width:70px;height:70px;border-radius:35px;">
			      </template>
			    </el-table-column>
			    <el-table-column prop="name" label="商家名称" min-width="100"></el-table-column>
			    <el-table-column prop="serviceCode" label="配送合作方" width="180">
					<!-- <template slot-scope="props">
									      {{$dateFormat(parseInt(props.row.createTime)*1000,"yyyy-MM-dd hh:mm:ss")}}
									    </template> -->
			    </el-table-column>
			    <el-table-column label="操作">
			      <template slot-scope="scope">
			      <div class="flex-x">
			       <router-link class="btn flex-x" :to="{path:'/merchant/billdetail',query:{id:scope.row.merchantId,phone:scope.row.phone}}">查看详情</router-link>	
			       <router-link class="btn flex-x" :to="{path:'/merchant/records',query:{id:scope.row.merchantId,phone:scope.row.phone}}" style="background:#ff4949;margin-left:20px;">流水明细</router-link>				       
			       </div>
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
    	currentValue:1,
    	total:1,
    	deliveryCompany:'ALL',
    	merchantId:null,
    	load_data:false,
    	companyList:[{value:'ALL',label:'全部配送方'},{value:'DaDa',label:'达达'},{value:'EleMe',label:'蜂鸟'}],
    	merchantList:[]
      
    };
  },
  computed:{
    
  },
  mounted(){
    this.getList();
  },
  methods: {
  	selectDelivery(){
  		this.getList(1);
  	},
  	handleSizeChange(){
      console.log("wer");
    },
    handleCurrentChange(current){
    	
      this.getList(current);
    },
  	onSubmit(){
  		if(this.merchantId){
  			this.getList(1,this.merchantId);
  		}else{
  			this.getList(1);
  		}
  		
  	},
  	/**
  	 * [getList description]
  	 * @param  {[type]} current [description]
  	 * @param  {[type]} type    配送的类别（蜂鸟、达达等）
  	 * @param  {[type]} content 商家编号
  	 * @return {[type]}         [description]
  	 */
  	getList(current,content){
  		var params = {
  			size:10,
  			current:current||1
  		}
  		if(this.deliveryCompany !== 'ALL'){
  			params.type = this.deliveryCompany;
  		}
  		if(content){
  			params.content = content;
  		}
  		this.$fetch.api_getData.getMerchantList(params)
  		.then((res) => {
  			this.merchantList = res.results.data;
  			this.total = res.results.total;
  		})
  		.catch((res) => {

  		})

  	},
  	handleDelete(index){},
    
    
   
    
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.merchant {
	.btn{
		width:100px;
		height: 35px;
		background: #50bfff;
		cursor: pointer;
		font-size:14px;
		color:#fff;
		border-radius: 5px;
	}
	
}

</style>
