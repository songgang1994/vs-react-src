/**
 * 审批画面用的Store
 * Created by songgang on 2017/11/2.
 */
// 导入React组件
import Reflux from 'reflux'
//导入访客审批用的Action
import VisitorApproveAction from '../actions/VisitorApproveAction.js'

let VisitorApproveDBStore = Reflux.createStore({
  // 监听VisitorApproveAction的所有事件
  listenables: VisitorApproveAction,
  //同意/拒绝 trigger
  onAgreeVisitorInvitationSuccess: function(result) {
    this.trigger(result);
  }
});

export default VisitorApproveDBStore
