/**
 * Created by songgang on 10/26/17.
 *  访客审批画面用action
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'
let VisitorAction = Reflux.createActions({
  //更新访客审核状态（拒绝/同意）
  agreeVisitorInvitation: {
    children: ['success']
  }
});

// 同意访客Action
 VisitorAction.agreeVisitorInvitation.listen(function(visitorIds,checkState){
   let userId = JSON.parse(localStorage.getItem('user')).staffId;
   $.VsAjax({
     url: "/visitor/checkVisitor",
     traditional:true,
     type: "POST",
     data:{
       memo:$('#reason').val(),
       ids:visitorIds,
       state:checkState,
       userId:userId
    }
  // 同意后触发子success Action
  }).done(this.success);
});

export default VisitorAction
