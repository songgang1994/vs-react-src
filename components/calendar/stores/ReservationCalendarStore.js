/**
 * 发送邀请下  会议室预约画面日历控件对应的stores
 * Created by caiwf on 17/11/10.
 */

import Reflux from 'reflux'

import ReservationCalendarAction from '../actions/ReservationCalendarAction'


let ReservationCalendarStore = Reflux.createStore({
    // 监听ReservationCalendarAction的所有事件
    listenables: ReservationCalendarAction,

    //修改预约事件完成
    onEditReservationCompleted: function(result) {
        this.trigger(result);
    },
    //删除预约事件完成
    onDeleteReservationCompleted: function(result) {
        this.trigger(result);
    },
    //拖拽预约事件完成
    onDropReservationCompleted: function(result) {
        this.trigger(result);
    },
    //改变预约事件结束时间完成
    onResizeReservationCompleted: function(result) {
        this.trigger(result);
    }
});

export default ReservationCalendarStore
