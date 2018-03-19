/**
 *部门树形列表画面的Action
 * Created by lihui on 17/11/6.
 */

import Reflux from 'reflux'

//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'

//定义Action处理
// Reflux.createActions可以同时定义多个Action
let DepartListAction = Reflux.createActions({
  //获取部门列表的Action
  departList: {
    // 等价于 children: ['completed', 'failed']
    asyncResult: true
  },
  //部门添加的Action
  departAdd: {},
  //部门删除的Action
  departDelete: {},
  //部门拖拽的Action
  departDrag: {},
  //部门名称编辑的Action
  departUpd: {}
});
//获取部门列表的Action
DepartListAction.departList.listen(function(companyId, departId) {
  $.VsAjax({
    url: "/depart/list",
    type: "POST",
    data: {
      companyId: companyId,
      departId: departId
    }
  }).then(this.completed, this.failed)
});

//部门添加的Action
DepartListAction.departAdd.listen(function(depart, onSuccess, onFailed) {
  $.VsAjax({
    url: "/depart/add",
    type: "POST",
    contentType: "application/json",
    data: depart
  }).done(onSuccess, onFailed);
});

//部门删除的Action
DepartListAction.departDelete.listen(function(departId, onSuccess, onFailed) {
  $.VsAjax({
    url: "/depart/delete",
    type: "POST",
    data: {
      departId: departId
    }
  }).done(onSuccess, onFailed);
});

//部门拖拽的Action
DepartListAction.departDrag.listen(function(departDto,onSuccess, onFailed) {
  $.VsAjax({
    url: "/depart/drag",
    type: "POST",
    contentType: "application/json",
    data: departDto,
  }).done(onSuccess, onFailed);
});

//部门名称编辑的Action
DepartListAction.departUpd.listen(function(departId, departName, onSucceed, onFailed) {
  $.VsAjax({
    url: "/depart/update",
    type: "POST",
    data: {
      departId: departId,
      departName: departName
    }
  }).done(onSucceed).fail(onFailed);
});
export default DepartListAction
