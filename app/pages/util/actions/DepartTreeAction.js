/**
 *部门树形列表画面的Action
 * Created by yao on 17/11/6.
 */

import Reflux from 'reflux'

//导入共通Ajax
import $ from '../../../../app/com/vs-ajax'

//定义Action处理
// Reflux.createActions可以同时定义多个Action
let DepartTreeAction = Reflux.createActions({
  //获取部门列表的Action
  departList: {
    // 等价于 children: ['completed', 'failed']
    asyncResult: true
  }

});
//获取部门列表的Action
DepartTreeAction.departList.listen(function(companyId, departId) {
  $.VsAjax({
    url: "/depart/list",
    type: "POST",
    data: {
      companyId: companyId,
      departId: departId
    }
  }).then(this.completed, this.failed)
});

export default DepartTreeAction
