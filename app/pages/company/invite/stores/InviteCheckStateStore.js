/**
 * 查询邀请一览审批状态查询
 * Created by nicheng on 11/15/17.
 */

 import Reflux from 'reflux'

 import InvitelistchildAction from '../actions/InvitelistchildAction'

 let InviteCheckStateStore = Reflux.createStore({
   //监听SettingAction所有事件
   listenables: InvitelistchildAction,
   //成功返回设置信息
   onGetInviteCheckStateCompleted:function(result){
     // 从服务器返回的ResultDto中获取表单input状态列表
     let formStatus = result.data;
     //trigger会导致jsx中_onInitFormDone事件执行，事件参数即为此处trigger参数
     this.trigger(formStatus);
   }
 });

 export default InviteCheckStateStore
