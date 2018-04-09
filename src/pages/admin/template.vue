<template>
  <div class="template">
   
	<div class="flex-x add-checker">
		<div class="flex-1"></div><span class="flex-x pointer" @click="showLayer">添加模板</span>
	</div>
    <el-table :data="templateList" ref="table" v-loading="load_data" :stripe=true element-loading-text="拼命加载中" style="width: 100%;">
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
	    <el-table-column prop="id" label="模板ID" width="100">
	      <!-- <template slot-scope="props">
	        <img :src="props.row.mainPic" alt="" style="width:70px;height:70px">
	      </template> -->
	    </el-table-column>

	    <el-table-column label="模板图片" >
			<template slot-scope="props">
				<img :src="props.row.mainPic" style="width:70px;height:auto" />
		      
		    </template>
	    </el-table-column>
	    <el-table-column prop="name" label="模板名称" ></el-table-column>
	    <el-table-column prop="testNum" label="体验者数量" ></el-table-column>
	    <el-table-column prop="status" label="状态" width="180">
			<template slot-scope="scope">
				<div class="test-state-box flex-x" v-if="scope.row.isClose*1 === 0">
					<div v-if="scope.row.useStatus == 'OVER_POST'" class="flex-x" style="width:155px;height:40px;background:#999999;color:#fff">发布</div>
			     	<div class="flex-x test-state" v-else>
			     		<span class="left flex-x" v-if="scope.row.useStatus !== 'DEV_TEST'" @click="templateStateChange('pre',scope.row.useStatus,scope.row.id,scope.$index)" style="cursor:pointer;">&lt;</span>
			     		<span class="right flex-x" v-else></span>
			     		<div class="flex-1 flex-x" v-if="scope.row.useStatus == 'DEV_TEST'">开发测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'DEV_TESTER_TEST'">执行测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'DEV_CPE_TEST'">兼容测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'PRO_TEST'">线上测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'PRO_CPE_TEST'">线上兼容测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'OVER_TEST'">测试完成</div>
			     		<span class="right flex-x" v-if="scope.row.useStatus !== 'OVER_TEST'" @click="templateStateChange('next',scope.row.useStatus,scope.row.id,scope.$index)" style="cursor:pointer;">&gt;</span>
			     		<span class="right flex-x" v-else></span>
			     	</div>

		     	</div>
		     	<div class="test-state-box flex-x" v-else>
					<div v-if="scope.row.useStatus == 'OVER_POST'" class="flex-x" style="width:155px;height:40px;background:#999999;color:#fff">已发布</div>
			     	<div class="flex-x test-state" v-else style="border:1px solid #999;color:#999;">
			     		<span class="left flex-x" v-if="scope.row.useStatus !== 'DEV_TEST'" >&lt;</span>
			     		<span class="right flex-x" v-else></span>
			     		<div class="flex-1 flex-x" v-if="scope.row.useStatus == 'DEV_TEST'">开发测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'DEV_TESTER_TEST'">执行测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'DEV_CPE_TEST'">兼容测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'PRO_TEST'">线上测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'PRO_CPE_TEST'">线上兼容测试</div>
			     		<div class="flex-1 flex-x" v-else-if="scope.row.useStatus == 'OVER_TEST'">测试完成</div>
			     		<span class="right flex-x" v-if="scope.row.useStatus !== 'OVER_TEST'">&gt;</span>
			     		<span class="right flex-x" v-else></span>
			     	</div>

		     	</div>
		    </template>
	    </el-table-column>
	    <el-table-column prop="testNum" label="已发版本" >
				<template slot-scope="props">
					{{props.row.proTemp==-1? '—  —': props.row.proTemp}}
		    </template>
			</el-table-column>
	    <el-table-column prop="testNum" label="未发版本" >
				<template slot-scope="props">
					{{props.row.newestTemp==-1? '— —': props.row.newestTemp}}
		    </template>
				</el-table-column>			
	     <el-table-column prop="createTime" label="模板更新时间" >
			<template slot-scope="props">
		      {{$dateFormat(parseInt(props.row.createTime)*1000,"yyyy-MM-dd hh:mm:ss")}}
		    </template>
	     </el-table-column>
	    <el-table-column label="操作" >
	      <template slot-scope="scope">
	      <div class="flex-x">
	      	<router-link :to="{path:'/admin/template/add',query:{id:scope.row.id}}">编辑</router-link>
	      	<div class="submit-tem" v-if="scope.row.isClose*1 == 0" @click="taggleTemplateState(scope.$index,scope.row.id,1)">关闭</div>
	      	<div class="submit-tem" v-else @click="taggleTemplateState(scope.$index,scope.row.id,0)">开启</div>


	        <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index)">编辑</el-button> -->
	        <div class="submit-tem" v-if="scope.row.useStatus == 'OVER_TEST'" @click="submitTemplate(scope.$index,scope.row.id)">发布</div>
	        <div class="submit-tem" v-else></div>
	        </div>
	      </template>
	    </el-table-column>
  <!--   <el-table-column prop="create_time" label="申请时间" width="100"></el-table-column>
  <el-table-column prop="createTime" label="审核员" width="180"> -->
      <!-- <template slot-scope="props">
        {{$dateFormat(parseInt(props.row.createTime)*1000,"yyyy-MM-dd hh:mm:ss")}}
      </template> -->


    </el-table>
    <div class="cover"  v-if="show"></div>
    <div class="add-checker-layer flex-y" v-if="show">
    	<div class="checker-tip flex-x">
    		<li class="word flex-x">添加审核员</li>
    		<li class="flex-1"></li>
    		<li class="icon-cancel pointer flex-x" @click="showLayer"><i class="el-icon-close"></i></li>
    	</div>
    	<ul class="flex-y input-box">
    		
    		<li class="flex-1 flex-x"><span>审核员姓名</span><div class="flex-1"><input type="text" placeholder="请输入姓名" v-model="checker.name"></div></li>
    		<li class="flex-1 flex-x"><span>审核员手机号</span><div class="flex-1"><input type="text"  placeholder="请输入手机号" v-model="checker.phone"></div></li>
    	</ul>
    	<div class="btn flex-x">
    		<div class="btn-confirm flex-x pointer" @click="addChecker">确定</div>
    		<div class="btn-cancel flex-x pointer"  @click="showLayer">取消</div>
    		<div class="flex-1"></div>
    	</div>
    	<div class="flex-1"></div>
    </div>
    <div class="block">
  
	    <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	  
	      :page-size="10"
	      layout="prev, pager, next, jumper"
	      :total="total">
	    </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">



export default {
  data() {
    return {
      show:false,
      total:10,
      
      statusObj:{
      	'DEV_TEST':{
      		'pre':null,
      		'next':'DEV_TESTER_TEST'
      	},
      	'DEV_TESTER_TEST':{
      		'pre':'DEV_TEST',
      		'next':'DEV_CPE_TEST'
      	},
      	'DEV_CPE_TEST':{
      		'pre':'DEV_TESTER_TEST',
      		'next':'PRO_TEST'
      	},
      	'PRO_TEST':{
      		'pre':'DEV_CPE_TEST',
      		'next':'PRO_CPE_TEST'
      	},
      	'PRO_CPE_TEST':{
      		'pre':'PRO_TEST',
      		'next':'OVER_TEST'
      	},
      	'OVER_TEST':{
      		'pre':'PRO_CPE_TEST',
      		'next':null
      	}
      },
      templateList:[],
      load_data:false,
      checker:{
      	name:'',
      	phone:''
      },
      formInline: {
        user: '',
        region: ''
      }

      
    };
  },

  mounted(){
    this.getTemplateList(1);
  },
  methods: {
  	/**
  	 * [taggleTemplateState description]
  	 * @param  {[type]} index 模板数组的index值
  	 * @param  {[type]} id    模板的id
  	 * @param  {[type]} type  0：点击关闭，1：点击开启
  	 * @return {[type]}       [description]
  	 */
  	taggleTemplateState(index,id,type){
  		console.log(index);
  		this.$fetch.api_getData.taggleTemplateState({templateId:id, isClose:type})
  		.then((data)=>{
  			this.templateList[index].isClose = type;



  		})
  		.catch((data)=>{
  			this.$message({
	          type: 'error',
	          message: data.errors
	        });   

  		})



  	},
  	/**
  	 * [templateStateChange description]
  	 * @param  {[type]} preOrNext 向前向后走
  	 * @param  {[type]} useStatus [description]
  	 * @return {[type]}           [description]
  	 */
  	templateStateChange(preOrNext,useStatus,templateId,index){
  		console.log(index);
  		this.$fetch.api_getData.templateState({ templateId: templateId,useStatus:this.statusObj[useStatus][preOrNext]})
  		.then((data) =>{
  			this.templateList[index].useStatus = this.statusObj[useStatus][preOrNext];

  		})
  		.catch((data)=>{

  			if(data.code == 584){
  				let authUrl = data.results;
  				console.log(authUrl);
		  		 this.$confirm('需要授权, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		           window.open(authUrl);
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消授权'
		          });          
		        });
	             
	           

  			}else{
  				this.$message({
		            type: 'error',
		            message: data.errors
		          });   
  			}
         

  		})

  	},
  	getTemplateList(current){
  		this.$fetch.api_getData.getTemplateList({current:current,size:10,status:1}).then((data)=>{
  		  console.log("s",data);
	      this.templateList = data.results.records;
	      this.total = data.results.total;
	      console.log(data);
	    })
  	},

  	showLayer(){
  		console.log(this.$router);
  		this.$router.push('/admin/template/add');
  		
  	},
  	submitTemplate(index,templateId){
  		this.$fetch.api_getData.submitTemplate({templateId})
  		.then((data)=>{
  			this.$message.success("发布成功！")
  			this.templateList[index].useStatus = 'OVER_POST'

  		})
  		.catch((data)=>{
  		  this.$message({
            type: 'info',
            message: data.errors
          });  

  		})

  	},
    onSubmit(){},
    handleSizeChange(index){
    	this.getTemplateList(index);
    },
    handleCurrentChange(index){
    	console.log("ds",index);
    	this.getTemplateList(index);
    },
    handleDelete(index){
    	
    	var _id = this.templateList[index].id;
    	
    	this.$confirm('您确定要删除这个审核员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	
        	this.$fetch.api_getData.deleteChecker({id:_id})
	    	.then((res)=>{
	    		console.log(res);

	    		if(res.code == 200){
	    			this.checkerList.splice(index,1);
	    			this.$message({
			            type: 'success',
			            message: '删除成功!'
			        });
	    		}
	    	})
	    	.catch((res)=>{

	    	})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    	
    },
    addChecker(){
    	console.log(this.checker);
    	this.$fetch.api_getData.addChecker(this.checker)
    	.then(({data})=>{

    		console.log(data);
    		if(data.code == 200){
    			 this.$message('添加成功');
    			 this.getcheckerList(1);
    		}
    	})
    	.catch((res)=>{

    	})
    }
    
   
    
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">


.template{
	.submit-tem{
		color:#ff3c42;
		margin-left: 20px;
		cursor: pointer;
	}
	.el-table__row{
		height:100px;
		text-align: center;
	}
	.el-table__header .cell{
		text-align: center;
	}
	.test-state-box{
		width: 100%;
		
	}
	.test-state{
		width:160px;
		height:42px;
		border:1px solid #6ea8e8;
		color:#6ea8e8;
		span{
			height: 42px;
			width:30px;
		}
	}
	
}
.cover{
	background: #000;
	position: fixed;
	bottom: 0px;
	left:0px;
	top:0px;
	right:0px;
	opacity: 0.5;
	z-index: 5;
}
.add-checker-layer{
	
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
	.input-box{
		color:#adadad;
		width:100%;
		height: 210px;
		margin-top:28px;
		input{
			width:336px;
			text-indent: 10px;
			height: 40px;
			border:1px solid #d8d8d8;
		}
		li{
			width:100%;
		}
		span{
			width:137px;
			text-align: right;
			padding-right: 20px;
			margin-left: 16px;
		}
	}
	.btn{
		width:100%;
		margin-top: 40px;
		font-size:15px;

	}
	.btn-confirm{
		width:104px;
		height: 32px;
		background: #fe1b46;
		color: #fff;
		margin-left: 70px;

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
.select-item{
  color:#fe1b46;
 
  background: url("../../assets/images/angle_03.png") no-repeat center bottom;;
  
}
.add-checker{
	
	margin-bottom: 23px;
	span{
		background: #ff3c42;
		border:none;
		width:120px;
		height: 40px;
		border-radius:5px;
		color:#fff;

		
	}

}
.sub-tilte{
  color:#333333;
  height: 40px;
  background: #fff;
  border:1px solid #d8d9de;
  margin-bottom: 24px;
  .item{
    height: 41px;
    width:105px;

  }
}

</style>
