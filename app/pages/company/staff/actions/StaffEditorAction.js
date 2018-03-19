/**
 *员工画面，使用Action
 * Created by lihui on 17/11/6.
 */
import Reflux from 'reflux'
//导入共通Ajax


//定义Action处理
let StaffEditorAction = Reflux.createActions({
  //获取公司列表的Action
  staffList: {
    asyncResult: true
  },
  staffAdd:{},
  StaffEditor:{}
});
StaffEditorAction.staffList.listen(function(staffId) {
  $.VsAjax({
    url: "/staff/editor/" + staffId,
    type: "GET"
  }).done(this.completed);
});

StaffEditorAction.staffAdd.listen(function(staffAdd) {
  $.VsAjax({
    url: "/staff/staffAdd",
    type: "POST",
    contentType: "application/json",
    data: staffAdd
  });
  });

  StaffEditorAction.StaffEditor.listen(function(StaffEditor) {
    $.VsAjax({
      url: "/staff/staffEditor",
      type: "POST",
      contentType: "application/json",
      data: StaffEditor,
      success: function() {
        var table = $('#StaffList').DataTable();
        table.ajax.reload();
      }
    });
    });
export default StaffEditorAction
