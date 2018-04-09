<template>
  <div class="apply">
    <div class="query-checker flex-xs">
      <el-select v-model="currentChecker" placeholder="全部审核员">
        <el-option label="全部审核员" value="all" key="-1"></el-option>
        <el-option
          v-for="(item,index) in checkerList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
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

  <div class="data-list">
    <ul class="data-header flex-x">
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
        <li class="data-item flex-1">
          {{item.templateName}}
        </li>
        <li class="data-item flex-1">{{$dateFormat(parseInt(item.createTime)*1000,"yyyy-MM-dd hh:mm:ss")}}</li>
        
        <li class="data-item flex-1" v-if="status !== 2">{{$dateFormat(parseInt(item.auditTime)*1000,"yyyy-MM-dd hh:mm:ss")}}</li>
        <li class="data-item flex-1"><div class="flex-y">
          <div class="manager-name">{{item.managerName}}</div>
          <div class="manager-id">ID:{{item.managerId?item.managerId:0}}</div>
        </div></li>
        <li class="data-item flex-1 flex-x" v-if="status == 0">
          <div class="pointer detail-btn flex-x" @click="detailRefuse(index)">详情<div class="angle-icon-up" v-if="item.showRefuse"></div>
          <div class="angle-icon-down" v-else></div></div>
        
        </li>
        
      </ul>
      <p class="data-brief" v-show="item.showRefuse">驳回理由：{{item.revert}}</p>
    </div>
    </template>
    <div class="no-data" style="margin-top:20px;height:100px;" v-else><div style="height:100px;" class="flex-x">暂无数据</div></div>
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
  <el-dialog size="small" title="图片详情" v-model="isShow">
    <img :src="imgUrl" style="width:100%;height:100%" />
  </el-dialog>
  </div>
</template>
<script type="text/javascript">

import {mapGetters,mapState} from "vuex"
import * as type from "src/store/getters/type"

export default {
  data() {
    return {
      isShow:false,
      currentChecker:'all',
      status:2,//2 :注册 1: 通过 0:未通过
      total:1,
      applyList:[],
      imgUrl:'',
      load_data:false,
      currentValue:1,
      formInline: {
        user: '',
        region: ''
      },
      checkerList:[],
     

      
    };
  },
  computed:{
     ...mapGetters([type.GET_USER_INFO]),
    
    

  },
  mounted(){
    console.log("msgds",this[type.GET_USER_INFO]);
    //查询要审核数据列表
    this.getApplyList(1,2);
    //查询审核人的列表
    this.queryCheckerList();
  },
  methods: {
    isHiden(){
      this.isShow = false;
    },

    viewPic(imgUrl){
      this.imgUrl = imgUrl;
      this.isShow = true;

    },
    onSubmit(){
      
      this.getApplyList(1,this.status);

    },
    queryCheckerList(){
      this.$fetch.api_getData.queryCheckerList({})
      .then((data) => {
        this.checkerList = data.results;
      })
      .catch(()=>{

      })
    },
    detailRefuse(index){
      console.log(index);
      this.applyList[index].showRefuse = !this.applyList[index].showRefuse;

    },
    clicks(){
      console.log("msg");
    },
    
    handleSizeChange(){
      console.log("wer");
    },
    handleCurrentChange(current){
      this.getApplyList(current,this.status);
    },
    getApplyList(current,status){
      this.currentValue = current;


      current = current||1;
     
      let params ={current:current,size:10,status:status}
      if(this.currentChecker !== "all"){
        params.managerId = this.currentChecker;

      }
      this.status = status;
      this.$fetch.api_getData.applyList(params).then((data)=>{
        console.log(data);
        if(data.code == 200){
          let _applyList = data.results.records;
          for(let i=0;i<_applyList.length;i++){
            _applyList[i].certificatePic = _applyList[i].certificatePic?JSON.parse(_applyList[i].certificatePic):"";
            _applyList[i].showRefuse = false;
          }
          this.applyList = _applyList;
          this.total = data.results.total;
        }
  
        console.log(data);
      })
    },
    
   
    
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.big-img-box{
  position: fixed;
  width:800px;
  height:auto;
  z-index: 200;
  left:50%;
  margin-left: -400px;
  top:200px;
  .close{
    position: absolute;
    right:-30px;
    top:-20px;
    width:40px;
    height: 40px;
    font-size:30px;
    background: url('../../assets/images/cancel2.png') no-repeat center center;
    cursor: pointer;
  }
  img{width:800px;
    height: auto;}

}
.angle-icon-up{
  background: url("../../assets/images/more_up.png") no-repeat center center;
  background-size: 16px 16px;



  width:25px;
  height: 25px;

}
.angle-icon-down{
  background: url("../../assets/images/more_down.png") no-repeat center center;
  background-size: 16px 16px;
  width:25px;
  height: 25px;
  
}
.manager-name{
  color:#ff3c42;
}
.detail-btn{
  color:#2f63cf;
}
.query-checker{
  margin-bottom: 20px;
  .el-button{
    margin-left: 20px;
  }

}
.data-list{
  width:100%;
  .data-header{
    font-weight: bold;
    font-size:15px;
    width:100%;
    height: 54px;
    background: #fff;
    color: #333;
    li{
      text-align: center;
    }
    
  }

  .data-row:nth-child(even){
    background: #f8f9fc;
  }
  .data-row:nth-child(odd){
    background: #fff;
  }
  .data-row:hover{
    background:#f5f7fa;
  }
  .data-row{

    
    width:100%;
   
    color:#474748;
    ul{
      height: 130px;
      width:100%;
      li{
        text-align: center;
        .check-btn{
          .pass{
            color: #2f63cf;
          }
          .refuse{
            color:#ff3c42;
          }
          .split-line{
            color: #e7e7e7;
            margin:0 10px;
          }
        }
      }
    }
    .data-brief{
      width:100%;
      background: #e8e9ed;
      height: 70px;

    }
  }
  .data-brief{
    color:#ff3c42;
    width:100%;
    text-indent: 40px;
    padding-top:8px;
    padding-bottom: 8px;
  }
  img{
    width:70px;
    height: auto;
  }
 
}

.apply {
 
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

</style>
