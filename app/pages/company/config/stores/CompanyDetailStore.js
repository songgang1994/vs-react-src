/**
 * 公司管理员下  公司详细画面对应的getCompanyStore
 * Created by chenfei on 17/11/3.
 */

// 导入React组件
import Reflux from 'reflux'
import _ from 'lodash'
//导入监听action
import CompanyDetailAction from '../actions/CompanyDetailAction.js'

let CompanyDetailStore = Reflux.createStore({
  listenables: CompanyDetailAction,

  // 获取公司信息完成
  onGetCompanyCompleted:function(result) {
      //将获取到的值 传到jsx中的监听函数中
      this.trigger(result);
  }
});

export default CompanyDetailStore
