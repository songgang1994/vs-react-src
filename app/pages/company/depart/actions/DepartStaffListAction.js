/**
 *员工列表画面，使用Action
 * Created by lihui on 17/11/6.
 */

import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'

//定义Action处理
let DepartStaffListAction = Reflux.createActions({
  //获取datatable的Action
  viewInited: {},
  //获取公司列表的Action
  staffList: {
    asyncResult: true
  },
  //部门负责人修改的Action
  roleSetting: {
    children: ['success']
  },
  //移除员工的Action
  staffDelete: {
    children: ['success']
  }
});

let _$dtStaff = null;
//获取datatable的api Action处理
DepartStaffListAction.viewInited.listen(function($dtStaff) {
  _$dtStaff = $dtStaff;
})

//列表Action
DepartStaffListAction.staffList.listen(function(departId,companyId) {
  _$dtStaff.ajax.url('/staff/list/' + departId + '/' + companyId).load();
});

//部门负责人设置的Action
DepartStaffListAction.roleSetting.listen(function(leader, member) {
  $.VsAjax({
    url: "/staff/update/",
    type: "POST",
    traditional: true,
    data: {
      leader: leader,
      member: member
    },
    success: function() {
      var table = $('#StaffMain').DataTable();
      table.ajax.reload();
    }
  }).done(this.success);
});

//公司员工移除的Action
DepartStaffListAction.staffDelete.listen(function(idArray) {
  $.VsAjax({
    url: "/staff/delete/" + idArray,
    type: "POST",
    success: function() {
      var table = $('#StaffMain').DataTable();
      table.ajax.reload();
    }
  }).done(this.success);
});
export default DepartStaffListAction
