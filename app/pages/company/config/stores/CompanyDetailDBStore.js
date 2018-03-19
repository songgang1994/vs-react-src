/**
 * 公司管理员下  公司详细画面  DB增删改 对应的store
 * Created by chenfei on 17/11/3.
 */

// 导入React组件
import Reflux from 'reflux'
//导入监听action
import CompanyDetailAction from '../actions/CompanyDetailAction.js'

let CompanyDetailDBStore = Reflux.createStore({
  listenables: CompanyDetailAction,

  // 更新公司信息成功
  onUpdateCompanySuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
  }
});

export default CompanyDetailDBStore
