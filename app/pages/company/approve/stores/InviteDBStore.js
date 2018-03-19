/**
 * 邀请审批画面store
 * Created by caowj on 2017/11/7.
 */
import Reflux from 'reflux'
import InviteApproveAction from '../actions/InviteApproveAction.js'

let InviteDBStore = Reflux.createStore({
  // 监听InviteApproveAction的所有事件
    listenables: InviteApproveAction,
  //同意/拒绝 trigger
    onAgreeInviteSuccess:function(result) {
        this.trigger(result);
    }

});

export default InviteDBStore
