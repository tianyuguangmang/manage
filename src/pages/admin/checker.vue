<template>
  <div class="checker">
   
	<div class="flex-x add-checker">
		<div class="flex-1"></div><span class="flex-x pointer" @click="showLayer">添加审核员</span>
	</div>
    <el-table :data="checkerList" ref="table" v-loading="load_data" :stripe=true element-loading-text="拼命加载中" style="width: 100%;">
    <!-- <el-table-column type="selection" width="55"></el-table-column> -->
	    <el-table-column  type="index" label="序号" width="100">
	      <!-- <template slot-scope="props">
	        <img :src="props.row.mainPic" alt="" style="width:70px;height:70px">
	      </template> -->
	    </el-table-column>

	    <el-table-column prop="name" label="审核员姓名" min-width="100"></el-table-column>
	    <el-table-column prop="phone" label="审核员手机号" min-width="100"></el-table-column>
	    <el-table-column prop="id" label="审核员ID" min-width="100"></el-table-column>
	    <el-table-column label="添加时间" width="180">
			<template slot-scope="props">
		      {{$dateFormat(parseInt(props.row.createTime)*1000,"yyyy-MM-dd hh:mm:ss")}}
		    </template>
	    </el-table-column>
	    <el-table-column label="操作">
	      <template slot-scope="scope">
	        <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
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
    	<ul class="flex-y checker-input-box">
    		
    		<li class="flex-1 flex-x"><span>审核员姓名</span><div class="flex-1"><input type="text" placeholder="请输入姓名" v-model="checker.name"></div></li>
    		<li class="flex-1 flex-x"><span>审核员手机号</span><div class="flex-1"><input type="text"  placeholder="请输入手机号" v-model="checker.phone"></div></li>
    	</ul>
    	<div class="btn-s flex-x">
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
			checkerList:[],
			load_data:false,
			currentIndex:1,
			checker:{
				name:'',
				phone:''
			},
		};
	},

	mounted(){
		this.getcheckerList(1);
	},
	methods: {
		getcheckerList(current){
			this.$fetch.api_getData.checkerList({current:current,size:10,status:1})
			.then((data)=>{
				console.log(data);
				this.checkerList = data.results.records;
				this.total = data.results.total;
			
			})
			.catch((data) => {
				this.$message(data.errors);
			})
		},
		showLayer(){
			this.show = !this.show;
		},
		onSubmit(){},
		handleSizeChange(index){
			this.getcheckerList(index);
		},
		handleCurrentChange(index){
			this.currentIndex = index;
			this.getcheckerList(index);
		},
		handleDelete(index){
			
			var _id = this.checkerList[index].id;
			
			this.$confirm('您确定要删除这个审核员?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					
					this.$fetch.api_getData.deleteChecker({id:_id})
				.then((res)=>{
					console.log(res);

					if(res.code == 200){
							this.getcheckerList(this.currentIndex);
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
			var r=/^1[3456789]\d{9}$/;
			if(!r.test(this.checker.phone)){
				this.$message("手机号输入不正确");
				return ;
			}
			this.$fetch.api_getData.addChecker(this.checker)
			.then((data)=>{
				this.checker={
					phone:'',
					name:''
				}
				this.$message('添加成功');
				this.showLayer();
				this.getcheckerList(1);
			})
			.catch((data)=>{
				this.checker={
					phone:'',
					name:''
				}
				if(data.code ==555){
					this.$message(data.errors);
				}

			})
		}
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.checker .el-table__row{
  height: 80px;
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
	.checker-input-box{
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
	.btn-s{
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
