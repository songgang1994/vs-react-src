
// 导入Reflux组件
import Reflux from 'reflux'
//引用RefuseAction
import RefuseAction from '../actions/RefuseAction'
//服务器返回
let RefuseStore = Reflux.createStore({

  listenables:RefuseAction,
  onRefuseSuccess: function(result) {
    this.trigger(result);
  }
});
export default RefuseStore
