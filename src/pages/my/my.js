var app = getApp();
var service = require("../../js/service.js");
//var md5 = require("../../js/md5.js");
Page({
	data: {
		isRefund: 0,
		userBaseInfo: "",
		shopMsgForThis: null,
		msgCount: null,
		myInfo:null,
	},
	/**
	 * 点击到店支付进行扫二维码操作
	 * @return {[type]} [description]
	 */
	toMyGroup: function() {
		wx.navigateTo({
			url: '/pages/myGroup/myGroup'
		})
	},
	toMyCoupon: function() {
		wx.navigateTo({
			url: '/pages/myCoupon/myCoupon'
		})
	},
	toCenter: function(e) {
//		console.log(e.currentTarget.dataset)
		wx.navigateTo({
			url: '/pages/distributionCenter/distributionCenter?noCode='+e.currentTarget.dataset.nocode
		})
	},
	toMyPackage: function() {
		wx.navigateTo({
			url: '/pages/myPackage/myPackage'
		})
	},
	toVip: function() {
		wx.navigateTo({
			url: '/pages/vipList/vipList'
		})
	},
	toMyCount:function(){
		wx.navigateTo({
			url: '/pages/myCount/myCount'
		})
	},
	scanWXCode: function() {
		var _this = this;
		wx.scanCode({
			success: (res) => {
				_this.setData({
					res: res.path
				})
				wx.redirectTo({
					url: res.path
				})
			},
			fail: function(res) {
				wx.switchTab({
					url: '/pages/paybill/paybill'
				})
			}
		})
	},
	openShopAddress() {
		if(this.pos) {
			wx.openLocation({
				latitude: this.pos.latitude * 1,
				longitude: this.pos.longitude * 1,
				scale: 28,
				name: this.pos.positions
			})
		}

		/* wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        
      }
    })
*/
	},
	pos: null,
	onShow: function() {
		this.getMyPagePackage()
		if(!this.pos && app.globalData.shopGlobalMsg) {
			this.pos = {
				latitude: app.globalData.shopGlobalMsg.coordLatitude,
				longitude: app.globalData.shopGlobalMsg.coordLongitude,
				positions: app.globalData.shopGlobalMsg.positions
			}
		}
	},
	getMyPagePackage:function(){
		var _this=this;
		service.getMyPagePackage({},function(res){
			if(res.data.results){
				var results=res.data.results;
				var menberGrade=results.menberGrade+1;
				results.menberGrade="../../images/HY_"+menberGrade+".png"
				
				_this.setData({
					myInfo:results
				})
			}
		})
	},
	onLoad: function() {
		var _this = this;

		_this.setData({
			userBaseInfo: app.globalData.userBaseInfo,
			isRefund: app.globalData.shopGlobalMsg.isRefund,
		})
	}
})