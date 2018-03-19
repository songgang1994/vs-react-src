/*
 * 存储服务器返回保存设置操作返回码
 * Created by yao on 17/11/09
 */
 import Reflux from 'reflux'

 import SettingAction from '../actions/SettingAction'

 let SettingDBStore = Reflux.createStore({
   //监听SettingAction保存表单
   listenables: SettingAction,

   onSaveFormInputsStatusSuccess:function(result){
     //trigger会导致jsx中_onInitFormDone事件执行，事件参数即为此处trigger参数
     this.trigger(result);
   }
 });

 export default SettingDBStore
