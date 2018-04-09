export const loginUrl =  "/platformappmanager/examine/login"
//退出
export const loginOutUrl = "/platformappmanager/toLogout"
//注册列表
export const applyListUrl = "/platformmerchant/register/list"
//添加审核人
export const addCheckerUrl = "/platformappmanager/examine/add"
//审核员列表
export const checkerListUrl = "/platformappmanager/examine/list"
//删除审核人
export const deleteCheckerUrl = "/platformappmanager/examine/delete"
//审核员的操作
export const checkerOpationUrl = "/platformmerchant/audit/merchant"
export const getCodeUrl = "/smssendcontroller/smsSend/check/findPass"
//确认保存
export const savePasswordUrl = "/platformappmanager/examine/reset"
//审核人列表
export const queryCheckerListUrl = "/platformappmanager/examine/select_all"
//添加模板
export const addTemplateUrl = "/platformapptemplate/template/add"
//模板列表
export const getTemplateListUrl = "/platformapptemplate/template/list"
export const payListUrl = "/manage_pay_template/getList"
export const payDetailUrl = "/manage_pay_template/detail"
export const confirmPayUrl = '/manage_pay_template/complete_payment'
//模板状态改变
export const templateStateUrl = "/wechat/turn/template/status"
//模板详情
export const templateDetailUrl = '/platformapptemplate/template/details'
//绑定体验者
export const bindExperienceUrl = '/platformapptemplate/add_tester'
//解除体验者
export const cancelExperienceUrl = '/platformapptemplate/del_tester'
//项目发布
export const submitTemplateUrl = '/wechat/release/template'
//切换模板的开启
export const taggleTemplateStateUrl = '/wechat/update/close'
//新建模版时添加测试商户号
export const addMerchantUrl = '/platformmerchant/manage/addMerchant'
//餐饮、酒店评价分页
export const rateListCY = '/platformmerchantratetemplate/list'
//获取可以评价的模板列表
export const getTemplateListForEvaluateUrl = "/platformapptemplate/select/pro_template"


export const evaluateSaveUrl = "/platformmerchantratetemplate/save"
export const deleteEvaluateUrl = "/platformmerchantratetemplate/delete"
export const infoCountUrl = '/platformmerchant/manage/info_count'
//获取结算账号表
export const balanceUrl = '/subjectbalancebilling/pt/billing/page'
//管理后台获取结算对账单-订单明细
export const balanceOrderUrl = '/platformtransorder/pt/billing/order/page' 
//管理后台获取结算对账单-流水明细
export const balanceBillUrl = '/platformtransorder/pt/billing/bill/page'
export const confirmBalanceUrl = '/subjectbalancebilling/pt/billing/confirm/do'
export const merchantListUrl = '/platformtransorder/pt/merchnat/page'
export const billDetailUrl = "/platformtransorder/pt/merchant/transorder/page"
export const stateListUrl = "/platformtransorder/transOrderStatusList/get"
export const accountUrl = "/cashaccount/account/get"
export const recordsUrl = "/platformtransorder/pt/merchant/bill/page"
