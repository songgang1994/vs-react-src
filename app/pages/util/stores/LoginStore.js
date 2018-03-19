/**
 * 登录画面用的Store
 * Created by shaolj on 2017/11/2.
 */
// 导入React组件
import Reflux from 'reflux'
//导入登录用的Action
import LoginAction from '../actions/LoginAction'

let LoginStore = Reflux.createStore({
    // 监听LoginAction的所有事件
    listenables: LoginAction,
    // 初始化函数
    init: function() {
        this.data = {
            // 用户名默认为空字符串
            loginName: ""
        }
    },
    onLoginSuccess: function(result) {
        this.trigger(result);
    }
});

export default LoginStore
