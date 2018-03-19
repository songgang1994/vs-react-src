/**
 * 平台管理员下  公司画面  DB增删改 对应的store
 * Created by chenfei on 17/11/10.
 */

// 导入React组件
import Reflux from 'reflux'
//导入监听action
import CompanyDataTableAction from '../actions/CompanyDataTableAction.js'

let CompanyDataTableDBStore = Reflux.createStore({
  listenables: CompanyDataTableAction,

  // 更新公司信息成功
  onChangeCompanyStateSuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
  }
});

export default CompanyDataTableDBStore
