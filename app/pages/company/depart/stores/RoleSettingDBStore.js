/**
 * 部门员工领导设置Store
 * Created by lihui on 17/11/3.
 */

// 导入React组件
import Reflux from 'reflux'
//导入监听action
import DepartStaffListAction from './../actions/DepartStaffListAction.js'

let RoleSettingDBStore = Reflux.createStore({
  listenables: DepartStaffListAction,

  // 更新公司信息成功
  onRoleSettingSuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
  }
});

export default RoleSettingDBStore
