/**
 * 注册画面表单提交用的Store
 * Created by ninglong on 2017/11/6.
 */
 // 导入React组件
import Reflux from 'reflux'
//引用注册页面Action
import RegisterAction from '../actions/RegisterAction.js'

let StaffRegisterDBStore = Reflux.createStore({
  // 监听RegisterAction的注册事件
    listenables: RegisterAction,
    onRegisterSuccess:function(result) {
        this.trigger(result);
    }
});

export default StaffRegisterDBStore
