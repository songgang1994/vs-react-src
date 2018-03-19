/**
 * 发送邀请下  会议室预约画面对应的stores
 * Created by caiwf on 17/11/10.
 */

import Reflux from 'reflux'

import ReservationAction from '../actions/ReservationAction'


let ReservationStore = Reflux.createStore({
    // 监听ReservationAction的所有事件
    listenables: ReservationAction,
    //获取预约事件完成
    onSearchReservationCompleted: function(result) {
        this.trigger(result)
    },
});

export default ReservationStore
