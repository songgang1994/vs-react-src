/**
 * 注册画面查询公司列表用的Store
 * Created by ninglong on 2017/11/6.
 */
 // 导入React组件
import Reflux from 'reflux'
//引用注册页面Action
import RegisterAction from '../actions/RegisterAction'

let SearchCompanyListStore = Reflux.createStore({
  listenables: RegisterAction,
  init: function() {
    this.data = {}
  },
  onSearchCompanyCompleted: function(result) {
    // 从服务器返回的ResultDto中获取公司列表
    let companies = result.listData;
    // 触发，会导致监听LoginStore的Login的_onSearchCompanyDone事件执行
    // 调用_onSearchCompanyDone的参数即为此处trigger的参数
    this.trigger({
      companies: companies.map((company, index) => {
        return {companyId: company.companyId, companyName: company.companyName};
      })
    });
  }
});
export default SearchCompanyListStore
