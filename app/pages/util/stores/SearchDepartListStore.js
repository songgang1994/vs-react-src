/**
 * 注册画面部门列表用的Store
 * Created by ninglong on 2017/11/6.
 */
 // 导入React组件
import Reflux from 'reflux'
//引用注册页面Action
import RegisterAction from '../actions/RegisterAction'

let SearchDepartListStore = Reflux.createStore({
  listenables: RegisterAction,
  init: function() {
    this.data   = {}
  },
  //部门列表
  onSearchDepartCompleted: function(result) {
    // 从服务器返回的ResultDto中获取部门列表
    let depart = result.listData;
    this.trigger(
      {
        depart: depart.map((depart, index) => {
          return {departId: depart.departId, departName: depart.departName};
        })
      }
    )
    }
  });
export default SearchDepartListStore
