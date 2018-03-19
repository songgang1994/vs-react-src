/**
 * 员工审批画面用action
 * Created by caowj on 2017/11/11.
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'
let StaffApproveAction = Reflux.createActions({
  //更新审核状态（拒绝/同意）
  agreeStaff: {
    children: ['success']
  }
});

// 同意Action
 StaffApproveAction.agreeStaff.listen(function(staffApproveData){
   $.VsAjax({
     url: "/staff/checkStaff",
     traditional: true,
     type: "POST",
     data: {
       memo: staffApproveData.memo,
       ids: staffApproveData.ids,
       state: staffApproveData.checkState,
       userId: staffApproveData.staffId
     }
     // 同意后触发子success Action
   }).done(this.success);

});

export default StaffApproveAction
