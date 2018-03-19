/**
 * 找回密码画面用的Store
 * Created by xuwz on 2017/11/3.
 */

 // 导入Reflux组件
import Reflux from 'reflux'
// 导入找回密码用的Action
import FindPwdAction from '../actions/FindPwdAction'

let FindPwdStore = Reflux.createStore({
    //监听FindPwdAction的所有事件
    listenables: FindPwdAction,

// 查找邮箱成功
onFindSuccess:function(result) {
    //将获取到的返回值 传到jsx中的监听函数中
    this.trigger(result);
    }
});
export default FindPwdStore
