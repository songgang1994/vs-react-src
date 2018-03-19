import Reflux from 'reflux'
//导入新增用的Action
import AdminDetailAction from '../actions/AdminDetailAction'

let AdminDetaileStore = Reflux.createStore({
    // 监听LoginAction的所有事件
    listenables: AdminDetaileAction,
    // 初始化函数
    init: function() {
        this.data = {
            // 用户名默认为空字符串
            logName: "",
            name:"",
            password: "",
            confirm_password: "",
            remark: "",
        }
    },
  
});
