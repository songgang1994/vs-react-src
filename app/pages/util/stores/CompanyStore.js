/**
 * 登录画面用的Store
 * Created by shaolj on 2017/11/2.
 */
// 导入React组件
import Reflux from 'reflux'
//导入登录用的Action
import LoginAction from '../actions/LoginAction'

let CompanyStore = Reflux.createStore({
    // 监听LoginAction的所有事件
    listenables: LoginAction,
    // 初始化函数
    init: function() {
        this.data = {}
    },
    // 当公司列表成功返回时
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

export default CompanyStore
