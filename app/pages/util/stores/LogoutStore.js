/**
 * 登录画面用的Store
 * Created by shaolj on 2017/11/08.
 */
// 导入React组件
import Reflux from 'reflux'
//导入登录用的Action
import LoginAction from '../actions/LoginAction'

let LogoutStore = Reflux.createStore({
    // 监听LoginAction的所有事件
    listenables: LoginAction,
    onLogoutSuccess: function(result) {
        this.trigger();
    }
});

export default LogoutStore
