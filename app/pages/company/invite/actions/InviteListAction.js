/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'

//定义Action处理
let InviteListAction = Reflux.createActions({

  // viewInited: {},
  getId: {},
  // getDepartId: {},
  // AddAdmin: {},
  // load: {asyncResult: true},
  // edit: {asyncResult: true}

});

// let _$dtStaff = null;
// //获取datatable的api Action处理
// InviteListAction.viewInited.listen(function($dtStaff) {
//   _$dtStaff = $dtStaff;
// })

//列表Action
// InviteListAction.load.listen(function(departId) {
//
//   _$dtStaff.ajax.url('/staff/depart/' + departId).load();
//
// });

//修改Action
// InviteListAction.edit.listen(function(staffId) {
//   $.ajax({
//     type: "GET",
//     url: "http://localhost:8088/vs-api-ctrl/staff/detail",
//     data: {
//       'staffId': staffId
//     },
//     dataType: "json",
//   }).then(this.completed, this.failed)
//
// });
//Id主键Action
InviteListAction.getId.listen(function(id) {});
// InviteListAction.getDepartId.listen(function(id) {});
// InviteListAction.AddAdmin.listen(function(id) {});

export default InviteListAction
