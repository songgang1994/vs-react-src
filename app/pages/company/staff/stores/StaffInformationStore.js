/**
 * 员工一览Store
 * Created by Xuwz on 2017/11/16
 */

import Reflux from 'reflux'

import StaffInformationAction from '../actions/StaffInformationAction'

let StaffInformationStore = Reflux.createStore({
    // 监听StaffInformationAction的所有事件
    listenables: StaffInformationAction,

    // 当员工信息成功返回时
    onStaffCompleted: function(result) {
        // 从服务器返回的ResultDto中获取员工列表
        this.trigger(result)

    }
});

export default StaffInformationStore
