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
let AdminDetaileAction = Reflux.createActions({

    find: {
        children: ['success']
    },
    findout: {
        children: ['success']
    }

});
//登录Action
AdminDetaileAction.detail.listen(function (deta) {

        this.success.name = deta.name;
        this.success.logname = deta.logname;
        this.success.password = deta.password;
        this.success.confirm_password = deta.confirm_password;
        this.success.remark = deta.remark;


    $.VsAjax({
        url: "/util/AdminDetail",
        type: "POST",
        data: {
          name : deta.name;
          logname : deta.logname;
          password : deta.password;
          confirm_password : deta.confirm_password;
          remark : deta.remark;

        }
    }).done(this.success);
});

//登录Action的子Action
AdminDetaileAction.detail.success.listen(function(result) {
    switch (result.data.bizCode) {
      case config.API_BIZ_CODE.BIZ_CODE_SUCCESS:
        let user = result.data;
        localStorage.setItem("name", this.name);
        localStorage.setItem("logname", this.logname);
        localStorage.setItem("password", this.password);
        localStorage.setItem("confirm_password", this.confirm_password);
        localStorage.setItem("remark", this.remark);


        // 跳转到新增信息页面
        location.href = "/#/AdminDetaile"
        break;
      case config.API_BIZ_CODE.BIZ_CODE_RECORD_0:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg001});
        break;
      case config.API_BIZ_CODE.BIZ_CODE_LOGIN_AUTH_FAILED:
        VsUtil.ShowHintDialog({content: UtilMsg.Msg002});
        break;
    }
});


//退出Action
AdminDetaileAction.detailout.listen(function () {
    $.VsAjax({
        url: "/util/detail",
        cache: false,
        type: "DELETE"
    }).done(this.success)
});


//退出Action的子Action
AdminDetaileAction.detailout.success.listen(function(result) {
    // 退出后，删除localStorage
    localStorage.removeItem('name');
    localStorage.removeItem('logname');
    localStorage.removeItem('password');
    localStorage.removeItem('confirm_password');
    localStorage.removeItem('remark');

    // 跳转回新增信息画面
    location.href = "/#/AdminDetaile";
});
