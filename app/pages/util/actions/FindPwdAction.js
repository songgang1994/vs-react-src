/**
 * 找回密码画面用的Action
 * Created by xuwz on 2017/11/3.
 */

import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../app/com/vs-ajax'


//定义找回密码Action处理
let FindPwdAction = Reflux.createActions({
    find: {
        children: ['success']
    },
});

//找回密码的Action
FindPwdAction.find.listen(function (user) {
      //ajxa传参找回密码
     $.VsAjax({
        url: "/util/searchEmail",
        type: "POST",
        data: {
            userType:user.userType,
            email: user.email,
      }
    }).done(this.success);
});

export default FindPwdAction
