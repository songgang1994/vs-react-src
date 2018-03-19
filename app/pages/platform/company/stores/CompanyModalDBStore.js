/**
 * 公司信息模态框  DB增改 对应的store
 * Created by chenfei on 17/11/11.
 */

// 导入React组件
import Reflux from 'reflux'
//导入监听action
import CompanyModalAction from '../actions/CompanyModalAction.js'

let CompanyModalDBStore = Reflux.createStore({
  listenables: CompanyModalAction,

  // 插入公司信息成功
  onInsertCompanySuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
  },

  // 更新公司信息成功
  onUpdateCompanySuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
  }
});

export default CompanyModalDBStore
