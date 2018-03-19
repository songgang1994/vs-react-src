/**
 * 设置画面请求
 * Created by yao on 17/11/06.
 */

import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'

//定义Action处理
// Reflux.createActions可以同时定义多个Action
let SettingAction = Reflux.createActions({
  //初始页面默认设置
  initForm:{
    // 等价于 children: ['completed', 'failed']
    asyncResult: true
  },
  getRooms:{
    asyncResult: true
  },
  saveFormInputsStatus:{
    children: ['success']
  }
});

//获取表单input状态请求
SettingAction.initForm.listen(function(companyId){
  $.VsAjax({
    url:"/setting/getFormStatus",
    type:'GET',
    data:{
      companyId:companyId
    }
  }).done(this.completed);
});

//获取设置画面会议室管理请求
SettingAction.getRooms.listen(function(companyId){
  $.VsAjax({
    url:"/setting/getRoomsForSetting",
    type:'GET',
    data:{
      companyId:companyId
    }
  }).done(this.completed);
});

//保存提交设置请求
SettingAction.saveFormInputsStatus.listen(function(settings){
  $.VsAjax({
    url:"/setting/updFormInputs",
    type:'POST',
    contentType:'application/json',
    data:settings
  }).done(this.success);
});

export default SettingAction
