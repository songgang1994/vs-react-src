/**
 * 审批画面用的Store
 * Created by songgang on 2017/11/2.
 */
// 导入React组件
import Reflux from 'reflux'
//导入访客审批用的Action
import VisitorAction from '../actions/VisitorAction.js'

let VisitorStore = Reflux.createStore({
  // 监听VisitorAction的所有事件
  listenables: VisitorAction,
  //同意/拒绝 trigger
  onAgreeVisitorInvitationSuccess: function(result) {
    this.trigger(result);
  }
});

export default VisitorStore
