/**
 * 员工画面查询员工信息用的Store
 * Created by ninglong on 2017/11/15.
 */
 // 导入React组件
import Reflux from 'reflux'
//引用员工页面Action
import StaffedAction from '../actions/StaffedAction'

let SearchStaffListStore = Reflux.createStore({
  listenables: StaffedAction,

  onStaffListCompleted: function(result) {
    this.trigger(result);
  }
});
export default SearchStaffListStore
