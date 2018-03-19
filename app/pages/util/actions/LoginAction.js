/**
 * 登录画面用的Action
 * Created by shaolj on 2017/11/2.
 */

import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../app/com/vs-ajax'

//定义Action处理
// Reflux.createActions可以同时定义多个Action
let LoginAction = Reflux.createActions({
    // 搜索公司，获取公司列表Action
    searchCompany: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
    // 登录Action
    login: {
        children: ['success']
    },
    // 登出Action
    logout: {
        children: ['success']
    }
});

// 搜索公司，获取公司列表Action
LoginAction.searchCompany.listen(function(keyword) {
    // 所有向后台的Ajax调用都写成$.VsAjax
    $.VsAjax({
        url: "/company",
        type: 'GET'
    // 获取公司列表成功后触发completed子Action
    // 因为LoginStore监听该Action，所以会触发LoginStore.onSearchCompanyCompleted的执行
    }).done(this.completed);
});

//登录Action
LoginAction.login.listen(function (user) {

    $.VsAjax({
        url: "/util/login",
        type: "POST",
        data: {
            userType: user.userType,
            companyId: user.companyId,
            loginName: user.loginName,
            loginPassword: user.loginPassword
        }
    // 成功登录后触发子success Action
  }).done(this.success);
});

//退出Action
LoginAction.logout.listen(function () {
    $.VsAjax({
        url: "/util/login",
        type: "DELETE"
    // 成功退出后触发success子Action
    }).done(this.success)
});

export default LoginAction
