<template>
  <div style="width:100%;">
    <div v-if="!addShow">
      <div style="height:60px;padding-left:20px;margin-bottom:10px;background:#fff;" class="flex-x">
        <el-select v-model="templateType" @change="handleTemplate" size="small" style="width: 150px;">
          <el-option v-for="(item,index) in templateList" :key="'template_'+item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <div class="flex-1"></div>
        <el-button size="small" type="primary" icon="plus" @click="addEvaluate" style="margin-right:60px;">添加好评</el-button>
      </div>
      <div class="panel-body">
        <el-table :data="evaluateList" v-loading="load_data" :stripe=true element-loading-text="拼命加载中" style="width: 100%;" stripe>
          <el-table-column label="所评模板">
            <template slot-scope="props">
              <p class="text-overflow" v-if="props.row.appTemplateId == 1">美业</p>
              <p class="text-overflow" v-else-if="props.row.appTemplateId == 2">商城</p>
              <p class="text-overflow" v-else-if="props.row.appTemplateId == 3">外卖</p>
              <p class="text-overflow" v-else-if="props.row.appTemplateId == 4">餐饮</p>
              <p class="text-overflow" v-else-if="props.row.appTemplateId == 5">企业</p>
              <p class="text-overflow" v-else-if="props.row.appTemplateId == 6">住宿</p>
            </template>
          </el-table-column>
          <el-table-column label="会员头像">
            <template slot-scope="props">
              <img @click="imgLook(props.row.rateAvatar)" :src="props.row.rateAvatar" style="width:70px;height:70px;margin:0 10px 10px 0;cursor:pointer;">
            </template>
          </el-table-column>
          <el-table-column prop="rateNick" label="会员昵称">
          </el-table-column>
          <el-table-column prop="content" label="评论内容">
          </el-table-column>
          <el-table-column label="星级">
            <template slot-scope="props">
              <el-rate v-model="props.row.rateLine" :disabled="true">
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
               <el-button type="primary" size="small"  @click="editor_data(props.row)">编辑</el-button>
              <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page="current" :page-size="size" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog size="tiny" title="图片详情" v-model="dialogFormVisible">
        <img :src="url" style="width:100%;height:100%" />
      </el-dialog>
    </div>
    <div v-else style="">
      <div class="back" style="padding-top:8px;padding-left:20px;background:#fff;margin-bottom:10px;height:40px;">
        <el-button type="primary" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules" style="background:#fff;padding-top:20px;padding-bottom:20px;">
        <el-form-item label="选择模板:" prop="appTemplateId" style="width:400px;">
          <el-select v-model="form.appTemplateId" placeholder="请选择要评价的模板" style="width:400px;">
            <el-option v-for="(item,index) in templateList" :key="'template_'+item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员昵称:" prop="rateNick">
          <el-input placeholder="请输入会员昵称" style="width: 400px;" v-model="form.rateNick"></el-input>
        </el-form-item>
        <el-form-item label="会员头像" prop="rateAvatar">
          <div class="avatar-uploader" @click="addHeadImage">
            <img v-if="form.rateAvatar!=''" :src="form.rateAvatar" class="avatar" alt="添加图片" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>            
          </div>
          <p class="img-text">图片支持jpg,jpeg,png,bmp格式，
            <span>200*200</span>像素</p>
        </el-form-item>
        <el-form-item label="星级选择:">
          <el-select v-model="form.rateLine" size="small" style="width: 150px;">
            <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评论内容:" prop="content" style="max-width:650px">
          <el-input type="textarea" :rows="6" v-model.trim="form.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="saveEvaluate">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script type="text/javascript">
import axios from "axios";

export default {
  data() {
    return {
      templateList: [],
      addShow: false,
      evaluateList: [],
      currentValue: 1,
      form: {
        appTemplateId: null,
        rateNick: "",
        rateLine: 5,
        content: "",
        rateAvatar: ""
      },
      rules: {
        appTemplateId: [{ required: true }],
        rateNick: [{ required: true, message: "不能为空", trigger: "blur" }],
        rateAvatar: [{ required: true, message: "不能为空", trigger: "blur" }],
        rateLine: [{ required: true, message: "不能为空", trigger: "blur" }],
        content: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      industryId: this.$store.state.user_info.user.industryId,
      //当前页码
      current: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      size: 10,
      //请求时的loading效果
      load_data: true,
      id: null,
      url: "",
      dialogFormVisible: false,
      templateType: null,
      options: [
        { text: "5星", value: 5 },
        { text: "4星", value: 4 },
        { text: "3星", value: 3 },
        { text: "2星", value: 2 },
        { text: "1星", value: 1 }
      ]
    };
  },
  created() {
    this.getTemplateListForEvaluate();
  },

  methods: {
    editor_data(row){
      this.form = {
        id: row.id,
        appTemplateId: row.appTemplateId,
        rateNick: row.rateNick,
        rateLine: row.rateLine,
        content: row.content,
        rateAvatar: row.rateAvatar
      };
      this.addShow = true;
    },
    imgLook(item) {
      this.url = item;
      this.dialogFormVisible = true;
    },
    handleTemplate() {
      this.current = 1;
      this.get_table_data();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.get_table_data();
    },
    //添加头像
    addHeadImage() {
      let that = this;
      let _this = this;
      let x = this.$fetch.api_file.imgUpload(this, 1, function(that, data) {
        // console.log(data);
        _this.form.rateAvatar = data;
      });
      x.chooseFile();
    },
    //获取可评价的模板列表
    getTemplateListForEvaluate() {
      this.$fetch.api_getData
        .getTemplateListForEvaluate({})
        .then(res => {
          this.templateList = res.results;
          this.templateType = res.results[0].id;
          this.form.appTemplateId = res.results[0].id;
        })
        .catch(data => {});
    },
    //添加评价
    saveEvaluate() {
      var params = Object.assign({}, this.form);
      this.$refs.form.validate((valid) => {
        if(valid) {
          this.$fetch.api_getData
            .saveEvaluate(params)
            .then(res => {
              this.$message.success("保存成功");
              this.addShow = false;
              this.get_table_data();
              this.emptyForm();          
            })
            .catch(() => {
              this.$message.error("保存失败");
            });
        } else {
          console.log("参数有误");
          return false;
        }
      });

    },
    //评价列表
    get_table_data(current) {
      this.load_data = true;
      this.$fetch.api_getData
        .rateListCYData({
          current: current || this.current,
           size: this.size,
          templateId: this.templateType
        })
        .then(res => {
          this.evaluateList = res.results.records;
          this.total = res.results.total;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //删除评价
    delete_data(id) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch.api_getData
            .deleteEvaluate({ id: id })
            .then(res => {
              this.get_table_data();
              this.$message.success("删除成功");
            })
            .catch(() => {
              this.$message.error("删除失败");
            });
        })
        .catch(() => {});
    },
    addEvaluate() {
      this.addShow = true;
    },
    emptyForm() {
      this.form = {
        appTemplateId: null,
        rateNick: "",
        rateLine: 5,
        content: "",
        rateAvatar: ""
      };
    },
    back() {
      this.$confirm("此操作将放弃已编辑的内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addShow = false;
          this.emptyForm();
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.el-table__row {
  height: 100px;
}
.pro-dialog {
  .el-dialog__body {
    padding: 0;
    .pro-dialog-body {
      text-align: left;
      margin: 0 0 20px 0;
      button {
        margin-left: 20px;
      }
    }
  }
}
.avatar-uploader {
  width: 110px;
  height: 110px;
  line-height: 110px;  
  border: 1px solid #ddd;
  cursor: pointer;
  text-align: center;
  display: inline-block;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
