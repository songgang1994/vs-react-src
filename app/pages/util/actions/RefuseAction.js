/**
 * 拒绝Action
 * Created by songgang on 2017/11/2.
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../app/com/vs-ajax'
//导入共通函数
import VsUtil from '../../../../app/com/vs-util';

//共通配置参数
let config = window.SMARTADMIN_GLOBALS;

//消息参数
let UtilMsg = window.MSG_GLOBALS.UtilMsg;

//定义Action处理
let RefuseAction = Reflux.createActions({
  refuse: {
    children: ['success']
  }
});

//拒绝确认 Action
RefuseAction.refuse.listen(function(param) {
  $.VsAjax({
    url: param.url,
    type: "POST",
    traditional:param.traditional,
    data:{
      memo:$('#reason').val(),
      userId:param.userId,
      ids:param.data,
      state:param.state

    }
    // 同意后触发子success Action
  }).done(this.success);
});

export default RefuseAction
