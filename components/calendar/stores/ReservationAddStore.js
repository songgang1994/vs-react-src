/**
 * 发送邀请下  会议室预约画面日历控件添加对应的stores
 * Created by caiwf on 17/11/10.
 */

import Reflux from 'reflux'

import ReservationCalendarAction from '../actions/ReservationCalendarAction'


let ReservationAddStore = Reflux.createStore({
    // 监听ReservationCalendarAction的所有事件
    listenables: ReservationCalendarAction,

    //添加预约事件完成
    onAddReservationCompleted: function(result) {
        this.trigger(result);
    },
});

export default ReservationAddStore
