<template>
  <div class="template">
    <div class="query-checker flex-xs">
      <el-select v-model="currentPayWay" placeholder="全部审核员">
        <el-option label="全部支付方式" value="all" key="1"></el-option>
        <el-option label="微信支付" value="wechat" key="2"></el-option>
        <el-option label="运营人员" value="manual" key="3"></el-option>

      </el-select>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <template v-if="indentify == 'NORMAL'">
        <el-input v-model="phone" placeholder="请输入手机号码" style="width:240px;margin-left:20px;"></el-input>
        <el-button type="primary" @click="searchByPhone">搜索</el-button>
      </template>
      <template v-else-if="indentify == 'SUPER'">
        <el-select v-model="currentChecker" placeholder="全部审核员">
          <el-option label="全部审核员" value="all" key="-1"></el-option>
          <el-option v-for="(item,index) in checkerList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </template>
    </div>
    <template v-if="searchByType == 'phoneNumber'">
      <ul class="flex-xs sub-tilte">
        <li class="item flex-x">搜索结果</li>
      </ul>
      <div class="data-list" v-if="payList&&payList.length">
        <ul class="data-header flex-x">
          <li class="flex-1">商家编号</li>
          <li class="flex-1">营业执照</li>
          <li class="flex-1">商家地址</li>
          <li class="flex-1">注册手机号</li>
          <li class="flex-1">模板</li>
          <template v-if="searchResult.transStatus !== 'TRANS_PAY_SUCCESS'">
            <li class="flex-1">注册时间</li>
            <li class="flex-1">注册通过时间</li>
          </template>
          <template v-else>
            <li class="flex-1">付款方式</li>
          </template>
          <li class="flex-1">支付状态</li>
          <li class="flex-1" v-if="searchResult.transStatus == 'TRANS_PAY_SUCCESS'">购买时间</li>
          <li class="flex-1">操作</li>
        </ul>
        <div v-for="(item,index) in payList" class="data-row flex-y">
          <ul class="flex-x data-content">
            <li class="data-item flex-1">{{item.merchantId}}</li>
            <li class="data-item flex-1">
              <template v-if="item.snapshot.certificatePic&&item.snapshot.certificatePic[0]">
                <img @click="imgLook(item.snapshot.certificatePic[0])" :src="item.snapshot.certificatePic[0]" alt="">
              </template>
              <!-- <img :src="item.snapshot.certificatePic[0]" alt=""> -->
            </li>
            <li class="data-item flex-1">{{item.snapshot.positions}}{{item.snapshot.address}}</li>
            <li class="data-item flex-1">{{item.snapshot.phone}}</li>
            <li class="data-item flex-1">
              {{item.templateName}}
            </li>
            <template v-if="item.transStatus !== 'TRANS_PAY_SUCCESS'">
              <li class="data-item flex-1">{{item.createTime}}</li>
              <li class="data-item flex-1">{{item.auditTime}}</li>
            </template>
            <template v-else>
              <li class="flex-1">
                <span v-if="item.transType == 5">通过运营人员支付</span>
                <span v-else>微信支付</span>
              </li>
            </template>
            <li class="data-item flex-1">
              <div class="flex-y">
                <div class="flex-x" style="width:100%;" v-if="item.transStatus == 'TRANS_PAY_SUCCESS'">
                  已支付
                </div>
                <div class="flex-x" style="width:100%;" v-else>
                  未支付
                </div>
              </div>
            </li>
            <li class="data-item flex-1" v-if="item.transStatus == 'TRANS_PAY_SUCCESS'">{{item.auditTime}}</li>
            <li class="data-item flex-1">
              <div class="flex-y">
                <router-link v-if="item.transStatus == 'TRANS_PAY_SUCCESS'" :to="{path:'/common/pay/detail',query:{id:item.merchantId,transId:item.transId}}">详情</router-link>
                <div v-else class="confirm-pay flex-x" @click="confirmPay(item.merchantId,item.transId)">确认支付</div>
              </div>
            </li>
          </ul>
          <p class="data-brief" v-show="item.showRefuse"></p>
        </div>
      </div>
      <div class="no-data" style="margin-top:20px;height:100px;" v-else>
        <div style="height:100px;" class="flex-x">暂无数据</div>
      </div>
      <template v-else>
        <div class="not-find" style="width:100%;height:600px;margin-top:20px; background:#fff;padding-top:50px;">
          <div class="tip-msg flex-x" style="width:100%;">未搜索到该号码</div>
        </div>
      </template>
    </template>
    <template v-else>

      <ul class="flex-xs sub-tilte">
        <li class="item flex-x pointer selectItem" v-if="status == 'paid'">已支付</li>
        <li class="item flex-x pointer" v-else @click="getPayList(1,'paid',currentPayWay)">已支付</li>

        <li class="item flex-x pointer selectItem" v-if="status == 'un_payment'">未支付</li>
        <li class="item flex-x pointer" v-else @click="getPayList(1,'un_payment',currentPayWay)">未支付</li>

        <!--   <li class="item flex-x pointer">审核通过</li>
    <li class="item flex-x pointer">审核驳回</li> -->
      </ul>
      <div class="data-list" v-if="status == 'paid'">
        <ul class="data-header flex-x">
          <li class="flex-1">商家编号</li>
          <li class="flex-1">营业执照</li>
          <li class="flex-1">商家地址</li>
          <li class="flex-1">注册手机号</li>
          <li class="flex-1">模板</li>
          <li class="flex-1">付款方式</li>
          <li class="flex-1">支付状态</li>
          <li class="flex-1">操作</li>
        </ul>
        <template v-if="payList.length>0">
          <div v-for="(item,index) in payList" class="data-row flex-y">
            <ul class="flex-x data-content">
              <li class="data-item flex-1">{{item.merchantId}}</li>
              <li class="data-item flex-1">
                <template v-if="item.snapshot.certificatePic&&item.snapshot.certificatePic[0]">
                  <img @click="imgLook(item.snapshot.certificatePic[0])"  :src="item.snapshot.certificatePic[0]" alt="">
                </template>
                <!-- <img :src="item.snapshot.certificatePic[0]" alt=""> -->
              </li>
              <li class="data-item flex-1">{{item.snapshot.positions}}{{item.snapshot.address}}</li>
              <li class="data-item flex-1">{{item.snapshot.phone}}</li>
              <li class="data-item flex-1">
                {{item.templateName}}
              </li>
              <li class="flex-1">
                <span v-if="item.transType == 5">通过运营人员支付</span>
                <span v-else>微信支付</span>
              </li>
              <li class="data-item flex-1">
                <div class="flex-y">
                  <div class="flex-x" style="width:100%;">
                    已支付
                  </div>
                </div>
              </li>
              <li class="data-item flex-1">
                <div class="flex-y">
                  <router-link :to="{path:'/common/pay/detail',query:{id:item.merchantId,transId:item.transId}}">详情</router-link>
                </div>
              </li>
            </ul>
            <p class="data-brief" v-show="item.showRefuse"></p>
          </div>
        </template>
        <div class="no-data" style="margin-top:20px;height:100px;" v-else>
          <div style="height:100px;" class="flex-x">暂无数据</div>
        </div>
      </div>
      <div class="data-list" v-if="status == 'un_payment'">
        <ul class="data-header flex-x">
          <li class="flex-1">商家编号</li>
          <li class="flex-1">营业执照</li>
          <li class="flex-1">商家地址</li>
          <li class="flex-1">注册手机号</li>
          <li class="flex-1">模板</li>
          <li class="flex-1">注册时间</li>
          <li class="flex-1">注册通过时间</li>
          <li class="flex-1">支付状态</li>
        </ul>
        <template v-if="payList.length>0">
          <div v-for="(item,index) in payList" class="data-row flex-y">
            <ul class="flex-x data-content">
              <li class="data-item flex-1">{{item.merchantId}}</li>
              <li class="data-item flex-1">
                <template v-if="item.snapshot.certificatePic&&item.snapshot.certificatePic[0]">
                  <img @click="imgLook(item.snapshot.certificatePic[0])" :src="item.snapshot.certificatePic[0]" alt="">
                </template>
              </li>
              <li class="data-item flex-1">{{item.snapshot.positions}}{{item.snapshot.address}}</li>
              <li class="data-item flex-1">{{item.snapshot.phone}}</li>
              <li class="data-item flex-1">
                {{item.templateName}}
              </li>
              <li class="data-item flex-1">
                {{item.createTime}}
              </li>
              <li class="data-item flex-1">
                {{item.auditTime}}
              </li>
              <li class="data-item flex-1">
                <div class="flex-y">

                  <div class="flex-x" style="width:100%;">
                    未支付
                  </div>
                </div>
              </li>
            </ul>
            <p class="data-brief" v-show="item.showRefuse"></p>
          </div>
        </template>
        <div class="no-data" style="margin-top:20px;height:100px;" v-else>
          <div style="height:100px;" class="flex-x">暂无数据</div>
        </div>
      </div>
    </template>
    <div class="block" v-if="payList&&payList.length>0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="10" layout="prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog size="small" title="图片详情" v-model="isShow">
      <img :src="imgUrl" style="width:100%;height:100%" />
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      isShow: false,
      imgUrl: "",
      indentify: this.$store.state.user_info.user,
      phone: "",
      currentPayWay: "all",
      currentChecker: "all",
      show: false,
      total: 10,
      payList: [],
      load_data: false,
      searchResult: {},
      searchByType: "payWay", //是通过支付方式搜索还是通过手机号码搜索（phoneNumber）
      status: "paid",
      checker: {
        name: "",
        phone: ""
      },
      checkerList: [],
      formInline: {
        user: "",
        region: ""
      }
    };
  },

  mounted() {
    this.getPayList(1, this.status, null);
    if (this.indentify == "SUPER") {
      this.queryCheckerList();
    }
  },
  methods: {
    imgLook(item) {
      this.imgUrl = item;
      this.isShow = true;
    },
    queryCheckerList() {
      this.$fetch.api_getData
        .queryCheckerList({})
        .then(data => {
          this.checkerList = data.results;
        })
        .catch(() => {});
    },
    searchByPhone() {
      let r = /^1[3456789]\d{9}$/;
      if (!r.test(this.phone)) {
        this.$message({
          type: "error",
          message: "搜索手机号填写不正确!"
        });
        return false;
      } else {
        this.searchByType = "phoneNumber";

        let params = {
          phone: this.phone,
          pageNo: 1,
          pageSize: 10
        };
        this.$fetch.api_getData.getPayList(params).then(data => {
          if (data.code == 200) {
            let _payList = data.results.records;
            for (let i = 0; i < _payList.length; i++) {
              _payList[i].snapshot = JSON.parse(_payList[i].snapshot);
              if (
                _payList[i].snapshot.certificatePic &&
                _payList[i].snapshot.certificatePic != ""
              ) {
                _payList[i].snapshot.certificatePic = JSON.parse(
                  _payList[i].snapshot.certificatePic
                );
              }
            }
            console.log(_payList);
            this.payList = _payList;
            this.searchResult = _payList[0];
            this.total = data.results.total;
          }
        });
      }
    },

    getPayList(current, status, payWay, operatorId) {
      this.searchByType = "payWay";
      this.phone = "";
      current = current || 1;
      let params = { pageNo: current, pageSize: 10, status: status };
      if (payWay !== null && payWay !== "all") {
        params.payWay = payWay;
      }
      if (operatorId !== null && operatorId !== "all") {
        params.operatorId = operatorId;
      }
      this.status = status;
      this.$fetch.api_getData.getPayList(params).then(data => {
        if (data.code == 200) {
          let _payList = data.results.records;
          for (let i = 0; i < _payList.length; i++) {
            _payList[i].snapshot = JSON.parse(_payList[i].snapshot);
            console.log("s", _payList[i].snapshot.certificatePic);
            if (
              _payList[i].snapshot.certificatePic &&
              _payList[i].snapshot.certificatePic != ""
            ) {
              _payList[i].snapshot.certificatePic = JSON.parse(
                _payList[i].snapshot.certificatePic
              );
            }
          }

          this.payList = _payList;
          this.total = data.results.total;
        }
      });
    },

    showLayer() {
      console.log(this.$router);
      this.$router.push("/template/add");
    },
    onSubmit() {
      this.getPayList(1, this.status, this.currentPayWay, this.currentChecker);
    },
    handleSizeChange(index) {
      console.log(1);
    },
    handleCurrentChange(index) {
      console.log("ds", index);
      this.getPayList(index, this.status);
    },
    confirmPay(merchantId, transId) {
      this.$confirm("您确定要确定其为支付吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch.api_getData
            .confirmPay({ merchantId, transId })
            .then(data => {
              this.searchByPhone();
              this.$message({
                type: "success",
                message: "成功!"
              });
              this.$store.state.payCount++;
            })
            .catch(data => {
              this.$message({
                type: "error",
                message: data.errors
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleDelete(index) {
      var _id = this.templateList[index].id;

      this.$confirm("您确定要删除这个审核员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch.api_getData
            .deleteChecker({ id: _id })
            .then(res => {
              console.log(res);

              if (res.code == 200) {
                this.checkerList.splice(index, 1);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(res => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addChecker() {
      console.log(this.checker);
      this.$fetch.api_getData
        .addChecker(this.checker)
        .then(({ data }) => {
          console.log(data);
          if (data.code == 200) {
            this.$message("添加成功");
            this.getcheckerList(1);
          }
        })
        .catch(res => {});
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.confirm-pay {
  width: 100px;
  height: 43px;
  background: #ff3c42;
  color: #fff;
  cursor: pointer;
}
.template {
  .el-button {
    margin: 0 20px;
  }
  .el-table__row {
    height: 100px;
    text-align: center;
  }
  .el-table__header .cell {
    text-align: center;
  }
  .test-state-box {
    width: 100%;
  }
  .test-state {
    width: 160px;
    height: 42px;
    border: 1px solid #6ea8e8;
    color: #6ea8e8;
    span {
      height: 42px;
      width: 30px;
    }
  }
}

.select-item {
  color: #fe1b46;

  background: url("../../assets/images/angle_03.png") no-repeat center bottom;
}
.add-checker {
  margin-bottom: 23px;
  span {
    background: #ff3c42;
    border: none;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    color: #fff;
  }
}
.sub-tilte {
  color: #333333;
  height: 40px;
  background: #fff;
  border: 1px solid #d8d9de;
  margin-bottom: 24px;
  .item {
    height: 41px;
    width: 105px;
  }
}
</style>
