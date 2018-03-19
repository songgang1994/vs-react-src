/**
 * 访客审批画面用action
 * Created by songgang on 10/26/17.
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'
let VisitorApproveAction = Reflux.createActions({
  //更新访客审核状态（拒绝/同意）
  agreeVisitorInvitation: {
    children: ['success']
  }
});

// 同意访客Action
VisitorApproveAction.agreeVisitorInvitation.listen(function(visitorApproveData) {
  $.VsAjax({
    url: "/visitor/checkVisitor",
    traditional: true,
    type: "POST",
    data: {
      memo: visitorApproveData.memo,
      ids: visitorApproveData.ids,
      state: visitorApproveData.checkState,
      userId: visitorApproveData.staffId
    }
    // 同意后触发子success Action
  }).done(this.success);
});

export default VisitorApproveAction
