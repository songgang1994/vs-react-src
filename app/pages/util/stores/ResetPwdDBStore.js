/**
 * 重置密码画面用的Store
 * Created by xuwz on 2017/11/5.
 */
 // 导入Reflux组件
import Reflux from 'reflux'
//导入重置密码用的Action
import ResetPwdAction from '../actions/ResetPwdAction'

let ResetPwdDBStore = Reflux.createStore({
    //监听ResetPwdAction的所有事件
    listenables: ResetPwdAction,


    // 重置密码返回
    onResetSuccess:function(result){
        //将获取到的返回值 传到jsx中的监听函数中
        this.trigger(result);
    }

});

export default ResetPwdDBStore
