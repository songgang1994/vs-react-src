/**
 * 平台管理员下  公司审核画面  DB增删改 对应的store
 * Created by chenfei on 17/11/3.
 */

// 导入React组件
import Reflux from 'reflux'
//导入监听action
import ApproveDataTableAction from '../actions/ApproveDataTableAction.js'

let ApproveDataTableDBStore = Reflux.createStore({
  listenables: ApproveDataTableAction,

  // 更新公司信息成功
  onChangeCompanyStateSuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
  }
});

export default ApproveDataTableDBStore
