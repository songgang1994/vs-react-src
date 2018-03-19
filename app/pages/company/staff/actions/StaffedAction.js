/**
 *员工画面，使用Action
 * Created by lihui on 17/11/6.
 */
import Reflux from 'reflux'
//导入共通Ajax


//定义Action处理
let StaffedAction = Reflux.createActions({
  //获取datatable的Action
  viewInited: {},
  //获取公司列表的Action
  staffSetting:{},
  //获取公司列表的Action
  staffList: {
    asyncResult: true
  },
});
let _$dtStaff = null;
//获取datatable的api Action处理
StaffedAction.viewInited.listen(function($dtStaff) {
  _$dtStaff = $dtStaff;
})

//列表Action
StaffedAction.staffList.listen(function(departId,companyId) {
  _$dtStaff.ajax.url('/staff/list/' + departId + '/' + companyId).load();
});
  //部门负责人设置的Action
  StaffedAction.staffSetting.listen(function(leader, member) {
    $.VsAjax({
      url: "/staff/isvalid/",
      type: "POST",
      traditional: true,
      data: {
        leader: leader,
        member: member
      },
      success: function() {
        var table = $('#StaffList').DataTable();
        table.ajax.reload();
      }
    }).done(this.success);
  });
export default StaffedAction
