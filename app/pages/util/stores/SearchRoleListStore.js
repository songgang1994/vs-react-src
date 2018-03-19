/**
 * 注册画面角色列表用的Store
 * Created by ninglong on 2017/11/6.
 */
  // 导入React组件
import Reflux from 'reflux'
//引用注册页面Action
import RegisterAction from '../actions/RegisterAction'
let SearchRoleListStore = Reflux.createStore({
  listenables: RegisterAction,
  init: function() {
    this.data = {}
  },
  onSearchRoleCompleted: function(result) {
    //从服务器返回角色列表
    let role = result.listData;
    this.trigger({
      role: role.map((role, index) => {
        return {roleId: role.roleId, roleName: role.roleName};
      })
    })
  }
});
export default SearchRoleListStore
