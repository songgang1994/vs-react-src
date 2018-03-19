/*
 * 存储服务器返回表单radio、checkbox、textarea数据
 * Created by yao on 17/11/06
 */
 import Reflux from 'reflux'

 import SettingAction from '../actions/SettingAction'

 let SettingFormStore = Reflux.createStore({
   //监听SettingAction所有事件
   listenables: SettingAction,
   //成功返回设置信息
   onInitFormCompleted:function(result){
     // 从服务器返回的ResultDto中获取表单input状态列表
     let formStatus = result.data;
     //trigger会导致jsx中_onInitFormDone事件执行，事件参数即为此处trigger参数
     this.trigger(formStatus);
   }
 });

 export default SettingFormStore
