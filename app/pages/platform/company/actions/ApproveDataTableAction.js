/**
 * Created by chenfei on 2017/11/10.
 */
 import Reflux from 'reflux'
 //导入共通Ajax
 import $ from '../../../../../app/com/vs-ajax'

 let ApproveDataTableAction = Reflux.createActions({
    changeCompanyState:{
      children: ['success']
    }
  });

 // 修改公司状态
 ApproveDataTableAction.changeCompanyState.listen(function(ids,checkState,userId){
    $.VsAjax({
      url: "/company/state/",
      type: "POST",
      traditional:true,
      data:{
        memo:"",
        userId:userId,
        ids:ids,
        state:checkState
      }
  // 修改后触发后触发子success Action
  }).done(this.success);
 });



 export default ApproveDataTableAction
