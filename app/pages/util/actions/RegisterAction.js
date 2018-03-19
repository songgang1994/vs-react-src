/**
 * 注册页面用的Action
 * Created by 宁龙 on 2017/11/6.
 */
//导入Reflux组件
import Reflux from 'reflux'
let RegisterAction = Reflux.createActions({
  searchCompany: {
    asyncResult: true
  },
  register: {
    children: ['success']
  },
  registerEq: {
    asyncResult: true
  },
  searchRole: {
    asyncResult: true
  }
});
//查询公司列表Action
RegisterAction.searchCompany.listen(function() {
  $.VsAjax({
    url: "/register",
    type: 'GET'
  }).done(this.completed);
});
//查询部门列表Action
RegisterAction.registerEq.listen(function(companyId) {
  $.VsAjax({
    url: "/register/registerEq/" + companyId,
    type: "GET"
  }).done(this.completed);
});
//查询角色列表Action
RegisterAction.searchRole.listen(function(companyId) {
  $.VsAjax({
    url: "/register/registerRo/" + companyId,
    type: "GET"
  }).done(this.completed);
});
//表单提交Action
RegisterAction.register.listen(function(register) {
  $.VsAjax({
    url: "/register/registerAdd",
    type: "POST", contentType: "application/json",
    data: register
    }).done(this.success);
  });
export default RegisterAction
