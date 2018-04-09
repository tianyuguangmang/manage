import http from './ajax'

import axios from 'axios'
import * as port from "./url"
export function getRecords(data){
  return http.get(port.recordsUrl,data)
}
export function getAccount(data){
  return http.get(port.accountUrl,data)
}
export function getStateList(data){
  return http.get(port.stateListUrl,data)
}
export function getMerchantList(data){
  return http.get(port.merchantListUrl,data)
}
export function getBillDetail(data){
  return http.get(port.billDetailUrl,data)
}
//删除评论
export function deleteEvaluate(data){
  return http.post(port.deleteEvaluateUrl,data)
}
//评论保存
export function saveEvaluate(data){
  return http.json(port.evaluateSaveUrl,data)
}
//获取可评价的模板列表
export function getTemplateListForEvaluate(data){
  return http.get(port.getTemplateListForEvaluateUrl,data)
}
//餐饮、酒店评论分页 rateList
export function rateListCYData(data) {
  return http.get(port.rateListCY,data)
}

export function login(data) { 
  
  return http.json(port.loginUrl,data)
}

//注册列表
export function applyList(data) { 
  
  return http.get(port.applyListUrl,data)
}
//添加审核人
export function addChecker(data) { 
  
  return http.json(port.addCheckerUrl,data)
}
//删除审核人
export function deleteChecker(data) { 
  return http.post(port.deleteCheckerUrl,data)
}
//审核员列表
export function checkerList(data) { 
  return http.get(port.checkerListUrl,data)
}
//审核员的操作
export function checkerOpation(data) { 
  return http.post(port.checkerOpationUrl,data)
}
//退出
export function loginOut(data) { 
  return http.get(port.loginOutUrl,data)
}
export function getCode (data) {
	// body...
	return http.get(port.getCodeUrl,data)
}
export function savePassword (data) {
	// body...
	return http.json(port.savePasswordUrl,data)
}
export function queryCheckerList (data) {
  // body...
  return http.get(port.queryCheckerListUrl,data)
}
//添加模板
export function addTemplate(data){
  return http.json(port.addTemplateUrl,data)
}
//获取模板列表
export function getTemplateList(data){
  return http.get(port.getTemplateListUrl,data)
}
//获取模板列表
export function getPayList(data){
  return http.get(port.payListUrl,data)
}
//获取模板列表
export function getPayDetail(data){
  return http.get(port.payDetailUrl,data)
}
//确认支付
export function confirmPay(data){
  return http.get(port.confirmPayUrl,data)
}
//模板测试
export function templateState(data){
  return http.post(port.templateStateUrl,data)
}
//模板详情
export function getTemplateDetail(data){
  return http.get(port.templateDetailUrl,data)
}
//绑定体验者
export function bindExperience(data){
  return http.get(port.bindExperienceUrl,data)
}
//解除体验者
export function cancelExperience(data){
  return http.get(port.cancelExperienceUrl,data)
}
//项目发布
export function submitTemplate(data){
  return http.post(port.submitTemplateUrl,data)
}
//切换模板的开启
export function taggleTemplateState(data){
  return http.post(port.taggleTemplateStateUrl,data)
}
//切换模板的开启
export function infoCountData(data){
  return http.get(port.infoCountUrl)
}
//获取结算账号表
export function balanceData(data){
  return http.get(port.balanceUrl, data)
}
//获取结算账号表-订单明细
export function balanceOrderData(data){
  return http.get(port.balanceOrderUrl, data)
}
//获取结算账号表-流水明细
export function balanceBillData(data){
  return http.get(port.balanceBillUrl, data)
}
export function confirmBalanceData(data){
  return http.post(port.confirmBalanceUrl, data)
}