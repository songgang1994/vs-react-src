/**
 * 邀请审批画面用action
 * Created by caowj on 2017/11/11.
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'
let InviteApproveAction = Reflux.createActions({
  //更新邀请访客审核状态（拒绝/同意）
  agreeInvite: {
    children: ['success']
  }
});

// 同意访客Action
InviteApproveAction.agreeInvite.listen(function(ApproveData) {
  $.VsAjax({
    url: "/invitecheck/checkVisitor",
    traditional: true,
    type: "POST",
    data: {
      memo: ApproveData.memo,
      ids: ApproveData.ids,
      state: ApproveData.checkState,
      userId: ApproveData.staffId
    }
    // 同意后触发子success Action
  }).done(this.success);
});

export default InviteApproveAction
