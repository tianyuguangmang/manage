<template>
  <div class="check-apply">

   <ul class="flex-xs sub-tilte">
      <li class="item flex-x pointer selectItem" v-if="status == 2">注册申请</li>
      <li class="item flex-x pointer" v-else @click="getApplyList(1,2)">注册申请</li>

      <li class="item flex-x pointer selectItem" v-if="status == 1">审核通过</li>
      <li class="item flex-x pointer" v-else @click="getApplyList(1,1)">审核通过</li>

      <li class="item flex-x pointer selectItem" v-if="status == 0">申请驳回</li>
      <li class="item flex-x pointer" v-else @click="getApplyList(1,0)">申请驳回</li>

    <!--   <li class="item flex-x pointer">审核通过</li>
    <li class="item flex-x pointer">审核驳回</li> -->
   </ul>
 
 
  <div class="data-list" v-if="!load_data">
    <ul class="data-header flex-x" style="">
      <li class="flex-1">商家编号</li>
      <li class="flex-1">营业执照</li>
      <li class="flex-1">商家地址</li>
      <li class="flex-1">注册手机号</li>
      <li class="flex-1">模板</li>
      <li class="flex-1">申请时间</li>
      
      <li class="flex-1" v-if="status === 1">通过时间</li>
      <li class="flex-1" v-else-if="status === 0">驳回时间</li>
      <li class="flex-1">审核员</li>
      <li class="flex-1" v-if="status == 0">驳回理由</li>
      <li class="flex-1" v-else-if="status == 2">操作</li>
    </ul>
    <template v-if="applyList.length>0">
    <div v-for="(item,index) in applyList" class="data-row flex-y">
      <ul class="flex-x data-content">
        <li class="data-item flex-1">{{item.id}}</li>
        <li class="data-item flex-1" @click="viewPic(item.certificatePic[0])">
          <img :src="item.certificatePic[0]" alt="">
        </li>
        <li class="data-item flex-1">{{item.positions}}{{item.address}}</li>
        <li class="data-item flex-1">{{item.phone}}</li>
        <li class="data-item flex-1">{{item.templateName}}</li>
        <li class="data-item flex-1">{{$dateFormat(parseInt(item.createTime)*1000,"yyyy-MM-dd hh:mm:ss")}}</li>
        
        <li class="data-item flex-1" v-if="status !== 2">{{$dateFormat(parseInt(item.auditTime)*1000,"yyyy-MM-dd hh:mm:ss")}}</li>
        <li class="data-item flex-1">
          <div class="manager-name">{{item.managerName}}</div>
          <div class="manager-id">ID:{{item.managerId?item.managerId:0}}</div><!-- {{item.managerName}} -->
        </li>
   <!--      <li class="data-item flex-1" v-if="status == 0">
     <span class="pointer" @click="detailRefuse(index)">详情</span>
   </li> -->
        <li class="data-item flex-1 flex-x" v-if="status == 0">
          <div class="pointer detail-btn flex-x" @click="detailRefuse(index)">详情<div class="angle-icon-up" v-if="item.showRefuse"></div>
          <div class="angle-icon-down" v-else></div></div>
        
        </li>
        <li class="data-item flex-1" v-else-if="status == 2">
           <div class="check-btn flex-x"><span class="pointer pass" @click="passApply(index)">通过</span><span class="split-line">|</span><span class="pointer refuse"  @click="showLayer(index)">驳回</span></div>
        </li>
        
      </ul>
      <p class="data-brief" v-show="item.showRefuse">驳回理由：{{item.revert}}</p>
    </div>
    </template>
    <div class="no-data" style="margin-top:20px;height:100px;" v-else><div style="height:100px;" class="flex-x">暂无数据</div></div>
  </div>
  <div class="cover"  v-if="show"></div>
  <div class="add-refuse flex-y" v-if="show">
    <div class="checker-tip flex-x">
      <li class="word flex-x">添加驳回理由</li>
      <li class="flex-1"></li>
      <li class="icon-cancel pointer flex-x" @click="showLayer"><i class="el-icon-close"></i></li>
    </div>
    <ul class="flex-y refuse-input-box">
      <textarea v-model="refuseText" placeholder="请输入详细的驳回理由，使商家能做出相应的操作，让注册申请能顺利通过！"></textarea>
    </ul>
    <div class="btn flex-x">
      <div class="btn-confirm flex-x pointer" @click="refuseApply">确定</div>
      <div class="btn-cancel flex-x pointer"  @click="showLayer">取消</div>
      <div class="flex-1"></div>
    </div>
   
  </div>
  <div class="cover" v-show='isShow' @click="isHiden"></div>
  <div class="big-img-box" v-show='isShow'>
      <div class="close" @click="isHiden"></div>
      <img :src="imgUrl" alt="">
    
  </div>
  <div class="block" v-if="applyList&&applyList.length>0">
  
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



export default {
  data() {
    return {
      currentValue:1,
      isShow:false,
      imgUrl:'',
      refuseText:'',
      show:false,
      status:2,//2 :注册 1: 通过 0:未通过
      total:1,

      rufuseIndex:null,
      applyList:[],
      load_data:true,
      formInline: {
        user: '',
        region: ''
      }

      
    };
  },

  mounted(){
    this.getApplyList(1,2);
  },
  methods: {
    isHiden(){
      this.isShow = false;
    },

    viewPic(imgUrl){
      this.imgUrl = imgUrl;
      this.isShow = true;

    },
    
    showLayer(index){
      console.log(index);
      this.show = !this.show;
      this.refuseIndex = index||(index === 0)?index:null;
    },
    passApply(index){
      this.$confirm('您确定要将其通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(()=>{

        let params = {
          mid:this.applyList[index].id,
          auditStatus:1,//审核状态 0:未通过 1:通过
        }      
        this.$fetch.api_getData.checkerOpation(params)
        .then((res)=>{
          this.getApplyList(this.currentValue,2);
          //this.applyList.splice(this.refuseIndex,1)
          //this.total--;
          this.$message({
            type: 'success',
            message: '通过'
          });
          this.$store.state.passCount++;
        })
        .catch((data)=>{
          this.$message({
            type: 'info',
            message:data.errors
          });
        })
    

      })
     .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    refuseApply(){
       this.$confirm('您确定要将其驳回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(()=>{

        let params = {
          mid:this.applyList[this.refuseIndex].id,
          auditStatus:0,//审核状态 0:未通过 1:通过
          revert:this.refuseText


        }
        this.$fetch.api_getData.checkerOpation(params)
        .then((res)=>{
          this.showLayer();
          this.refuseText = "";
          this.getApplyList(this.currentValue,2);
          //this.applyList.splice(this.refuseIndex,1)
         //this.total--;
          this.$message({
            type: 'success',
            message: '已驳回'
          });
        })
        .catch((data)=>{
          this.$message({
            type: 'info',
            message:data.errors
          });
        })
    

      })
     .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });

     

    },
    detailRefuse(index){
      console.log(index);
      this.applyList[index].showRefuse = !this.applyList[index].showRefuse;

    },
    onSubmit(){},
    handleSizeChange(){
      console.log("wer");
    },
    handleCurrentChange(current){
      this.getApplyList(current,this.status);
    },
    /**
     * [getApplyList description]
     * @param  {[type]} current 当前页码值
     * @param  {[type]} status  状态值 0 审核驳回 1审核通过 2注册申请
     * @return {[type]}         [description]
     */
    getApplyList(current,status){
      current = current||1;
      this.status = status;
      this.load_data = true;
      this.currentValue = current;
      this.$fetch.api_getData.applyList({current:current,size:10,status:status})
      .then((data)=>{
        this.load_data = false;
       
        if(data.code == 200){
          let _applyList = data.results.records;
          for(let i=0;i<_applyList.length;i++){
            _applyList[i].certificatePic = _applyList[i].certificatePic?JSON.parse(_applyList[i].certificatePic):"";
            _applyList[i].showRefuse = false;
          }
          this.applyList = _applyList;
          this.total = data.results.total;
        }
      })
      .catch(()=>{
       
        this.load_data = false;
      })
    },
    
   
    
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.data-list 
{
   border:1px solid #dfe6ec;
  .data-header{
    background:#eef1f6;
   
    height: 40px;
  }
}
div.block{
  width:100%;
  margin-top: 20px;
  .el-pagination{
    float:right;
    margin-right: 50px;
  }

}
.refuse-record{
  
}
.no-data{
  height: 100px;
  background: #fff;
  color: #666;
}
.selectItem{
  color:#fe1b46;
 
  background: url("../../assets/images/angle_03.png") no-repeat center bottom;;
  
}
.certificate-img{
  width:130px;
  height: auto;
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
.add-refuse{
  
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
  .refuse-input-box{
    color:#adadad;
    width:100%;
    height: 210px;
    margin-top:28px;
    textarea{
      width:480px;
      text-indent: 10px;
      height: 200px;
      border:1px solid #d8d8d8;
      resize: none;
      padding: 10px;

    }
   
  }
  .btn{
    width:100%;
    margin-bottom: 40px;
    font-size:15px;
    margin-top: 40px;

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

</style>
