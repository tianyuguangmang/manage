<template>
	<div class="fundsList">
		<div class="box-top">
			<div>
				<el-date-picker v-model="month" type="month" placeholder="按月份" @change="changeMonth">
				</el-date-picker>
			</div>
      <div class="balance">
        <span>账户余额：</span>
        <span>¥&nbsp;{{this.$store.state.allBalance}}</span>
      </div>
		</div>
		<div class="box-select">
			<p style="">
				对账列表
			</p>
		</div>
		<div style="background: #FFFFFF;">
			<el-table :data="tableData"  v-loading="load_data" :stripe="true" element-loading-text="拼命加载中" style="width: 100%">
				<el-table-column label="月份">
          <template slot-scope="props">
						{{props.row.billingYear}}-{{props.row.billingMonth}}
					</template>
				</el-table-column>
				<el-table-column label="收入">
          <template slot-scope="props">
						<span style="color:#ff5555">¥&nbsp;{{props.row.borrowAmount}}</span>
					</template>
				</el-table-column>
				<el-table-column label="支出">
          <template slot-scope="props">
						<span style="color:#ff5555">¥&nbsp;{{props.row.creditAmount}}</span>
					</template>
				</el-table-column>
				<el-table-column label="期初余额">
          <template slot-scope="props">
						¥&nbsp;{{props.row.preAmount}}
					</template>
				</el-table-column>
				<el-table-column label="期末余额">
          <template slot-scope="props">
						¥&nbsp;{{props.row.amount}}
					</template>
				</el-table-column>
				<el-table-column prop="checkStatus" label="状态">
          <template slot-scope="props">
						<span v-if="props.row.checkStatus=='NORMAL'">正常</span>
						<span v-else style="color:#ff5555">异常</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width='280'>
					<template slot-scope="props">
						<el-button size="small" type="primary" @click="viewOrder(props.row)">订单明细</el-button>
						<el-button size="small" type="primary" @click="viewRecord(props.row)">流水明细</el-button>
						<el-button size="small" type="info" v-if="props.row.confirmStatus=='UN_CONFIRM'" @click="confirmBalance(props.row.id)">确认对账</el-button>
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
				load_data: false,
				tableData: null,
				month: null,
        current: 1,
        total: 0,
        size: 5
			}
		},
		created() {
			this.getBalance();
		},
		methods: {
			handleCurrentChange(val) {
				this.current = val;
				this.getBalance();				
      },
      changeMonth(value) {
				let date = value.split("-");
				let year = parseInt(date[0]);
				let month = parseInt(date[1]);
				this.getBalance(year, month);
      },
			//获取订单信息
			getBalance(year, month) {
				var _this=this;
				let param = {
        	current: this.current,
        	size: this.size
				};
				if(year&&month) {
					param.billingYear = year;
					param.billingMonth = month;
				}
				this.load_data = true;
				this.$fetch.api_getData.balanceData(param)
					.then((res) => {
            this.tableData = res.results.records;
						this.total =  res.results.total;
						this.load_data = false;	
					})
					.catch((res) => {
						// debugger
						this.load_data = false;	
					})
			},
			viewOrder(item) {
				this.$router.push({path: "/admin/balance/order/"+item.billingYear+"/"+item.billingMonth})
			},
			viewRecord(item) {
				this.$router.push({path: "/admin/balance/record/"+item.billingYear+"/"+item.billingMonth})				
			},
			confirmBalance(id) {
				this.$confirm("此操作将放弃已编辑的内容, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.$fetch.api_getData.confirmBalanceData({billId: id})
						.then((res) => {
							this.$message.success("确认成功");
							this.getBalance();
						})
						.catch((res) => {
							// debugger
							this.$message.error("确认失败");							
						})
					})
					.catch(() => {});
			}
		}
	}
</script>
<style type="text/css">
	.box-top {
		display: flex;
		justify-content: space-between;
	}
  .balance {
    margin-left:20px;
    background-color: #fff;
    max-width: 600px;
    min-width: 400px;
    height: 36px;
    font-size: 14px;
    border: 1px solid #ff5555;
  }
  .balance span:nth-child(1)  {
    line-height: 36px;          
    margin-left: 15px;
  }
  .balance span:nth-child(2)  {
    line-height: 36px;    
    color: #ff5555;
  }
  .el-button,
  .el-input__inner {
    border-radius: 0;
  }
	.fundsList tr th:last-child{
		width: 400px;
	}
	
	.box-select {
		border-radius: 2px;
		height: 40px;
		line-height: 40px;
		list-style: none;
		margin: 0;
		padding-left: 25px;
		background-color: #fff;
		margin: 15px 0;
		border: 1px solid #d1dbe5;
		display: flex;
		font-size: 14px;
	}
	
	.box-bottom {
		display: flex;
		height: 90px;
		align-items: center;
		justify-content: space-between;
		border: 1px solid rgb(223, 230, 236);
		border-top: none;
	}
	.box-bottom-con span {
		margin: 0 30px;
	}
</style>