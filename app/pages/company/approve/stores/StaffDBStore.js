/**
 * 员工审批画面用的Store
 * Created by caowj on 2017/11/11.
 */
// 导入React组件
import Reflux from 'reflux'
//导入员工审批用的Action
import StaffCheckAction from '../actions/StaffApproveAction.js'

let StaffDBStore = Reflux.createStore({
  // 监听StaffApproveAction的所有事件
  listenables: StaffCheckAction,
  //同意/拒绝 trigger
  onAgreeStaffSuccess: function(result) {
    this.trigger(result);
  }
});

export default StaffDBStore
