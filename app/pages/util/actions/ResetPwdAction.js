/**
 * 重置密码画面用的Action
 * Created by xuwz on 2017/11/5.
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../app/com/vs-ajax'
//导入共通函数
import VsUtil from '../../../../app/com/vs-util';


//定义重置密码Action处理
let ResetPwdAction = Reflux.createActions({
    reset: {
        children: ['success']
    },

});

//重置密码Action
ResetPwdAction.reset.listen(function (pass) {
    $.VsAjax({
        url: "/util/updatePwd",
        type: "POST",
        data: {
            sign: pass.sign,
            userType:pass.userType,
            password: pass.password,
            allid : pass.allid
        }
    }).done(this.success);
});

export default ResetPwdAction
