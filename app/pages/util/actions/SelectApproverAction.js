/**
 * 选择审批人Action
 * Created by Xuwz on 2017/11/10
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
// Reflux.createActions可以同时定义多个Action
let SelectApproverAction = Reflux.createActions({

    select: {
        children: ['success']
    },

});

//查询审批人按钮 Action
SelectApproverAction.select.listen(function(companyId,departId) {
    $.VsAjax({
       url: "/staff/getApprover/"+companyId+"/"+departId,
       type: "GET",
       data:{
             companyId:companyId,
             departId:departId
       }
    }).done(this.success);
});

export default SelectApproverAction
