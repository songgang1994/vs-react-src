/**
 * 部门员工领导设置Store
 * Created by lihui on 17/11/3.
 */

// 导入React组件
import Reflux from 'reflux'
//导入监听action
import StaffedAction from '../actions/StaffedAction.js'

let StaffSettingDBStore = Reflux.createStore({
  listenables: StaffedAction,

  // 更新公司信息成功
  onStaffSettingSuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
  }
});

export default StaffSettingDBStore
