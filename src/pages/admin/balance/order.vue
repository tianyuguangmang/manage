<template>
	<div>
		<div style="background: #fff;margin-bottom: 25px;">
			<el-button style="width: 60px;font-size: 10px;background:rgb(80,191,255);border: none;color: #FFF;"@click="back">返回</el-button>
		</div>
    <div class="box-top">
			<div>
        <el-input style="width: 300px;" v-model.trim="search">
          <template slot="append" style="">
            <el-button style="color:#fff;background:rgb(80,191,255);border:1px solid rgb(80,191,255);border-radius: 0;" @click="handleSearch" placeholder="请输入商家编号或商家名称进行搜索">搜索</el-button>
          </template>
        </el-input>
			</div>
      <div class="balance">
        <span>账户余额：</span>
        <span>¥&nbsp;{{this.$store.state.allBalance}}</span>
      </div>
		</div>
		<div style="background: #FFFFFF;margin-top:15px;">
      <el-table :data="tableData" :stripe="true" element-loading-text="拼命加载中" style="width: 100%">
				<el-table-column label="时间">
          <template slot-scope="props">
						{{$dateFormat(props.row.createTime*1000,'yyyy-MM-dd hh:mm:ss')}}
					</template>
				</el-table-column>
				<el-table-column label="商户编号" prop="merchantId">
				</el-table-column>
				<el-table-column label="商家logo">
          <template slot-scope="props">
						<img style="width:70;height:70px;border-radius:35px" :src="props.row.merchantLogo" />
					</template>
				</el-table-column>
        <el-table-column label="商家名称" prop="merchantName">
				</el-table-column>
				<el-table-column label="单号" prop="tradeId">
				</el-table-column>
        <el-table-column label="订单详情">
          <template slot-scope="props">
					<p v-for="item in props.row.tradeOrderList" class="order-list">
            <span class="order-list-caption">{{item.caption}}</span>
            <span class="order-list-num">x{{item.num}}</span>
          </p>
					</template>
				</el-table-column>
        <el-table-column label="金额">
          <template slot-scope="props">
						<span v-if="props.row.transProId==1" style="color:#ff5555">+&nbsp;¥&nbsp;{{props.row.amount}}</span>
						<span v-else>-&nbsp;¥&nbsp;{{props.row.amount}}</span>       
					</template>
				</el-table-column>
				<el-table-column label="状态">
          <template slot-scope="props">
						<span v-if="props.row.transStatus=='TRANS_PAY_SUCCESS'">已完成</span>
						<span v-else style="color:#ff5555">未完成</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="box-bottom">
				<div class="box-bottom-con">
				</div>
				<div class="box-bottom-index">
					<el-pagination background layout="total,prev, pager, next" :total="total" @current-change="handleCurrentChange" :current-page.sync="current" :page-size="size">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>

</template>
<script type="text/javascript">
	export default {
		data() {
			return {
        search: null,
        billingYear: null,
        billingMonth: null,
				tableData: [],
        current: 1,
        total: 0,
        size: 5
			}
		},
		created() {
      this.billingYear = this.$route.params.year;
      this.billingMonth = this.$route.params.month;
      let regex = /^[1-9]\d*$/;
      if(regex.test(this.billingYear) && regex.test(this.billingMonth)) {
        this.getBalanceOrder();
      } else {
        this.$router.replace({name: "notPage"})
      }
		},
		methods: {
			handleCurrentChange(val) {
        this.current = val;
        this.getBalanceOrder();
      },
      handleSearch() {
        this.getBalanceOrder(this.search);
      },
      getBalanceOrder(content) {
        let param = {
          current: this.current,
          size: this.size,
          billingYear: this.billingYear,
          billingMonth: this.billingMonth
        }
        if(content) {
          param.content = content;
        }
        this.$fetch.api_getData.balanceOrderData(param)
					.then((res) => {
            this.tableData = res.results.records;
            this.total =  res.results.total;
					})
					.catch((res) => {
            // debugger
					})
      },  
			back() {
				window.history.go(-1);
			},
		}
	}
</script>
<style type="text/css">
.order-list {
  display: flex;
  justify-content: space-between;
}
.order-list-caption,
.order-list-num {
  flex: 1;
}
</style>
