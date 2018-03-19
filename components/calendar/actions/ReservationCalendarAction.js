/**
 * 发送邀请下  会议室预约画面日历控件对应的action
 * Created by caiwf on 17/11/10.
 */

import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../app/com/vs-ajax'
//导入共通函数
import VsUtil from '../../../app/com/vs-util';

//定义Action处理
// Reflux.createActions可以同时定义多个Action
let ReservationCalendarAction = Reflux.createActions({

    addReservation: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
    editReservation: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
    deleteReservation: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
    dropReservation: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
    resizeReservation: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
});

//添加预约事件
ReservationCalendarAction.addReservation.listen(function(addEvents) {
    $.VsAjax({
        url: "/reservation",
        type: 'POST',
        traditional :true,
        data: {
          title: addEvents.title,
          start: addEvents.start,
          end: addEvents.end,
          detail: addEvents.detail,
          roomId: addEvents.roomId
        }
    }).done(this.completed, this.failed);
});
//修改预约事件
ReservationCalendarAction.editReservation.listen(function(editEvents) {
    $.VsAjax({
        url: "/reservation/edit",
        type: 'POST',
        contentType: "application/json",
        data: {
          meetingId:editEvents.meetingId,
          title: editEvents.title,
          detail: editEvents.detail,
          roomId: editEvents.roomId
        }
    }).done(this.completed);
});
//拖拽预约事件
ReservationCalendarAction.dropReservation.listen(function(meetingId,start,end) {
    $.VsAjax({
        url: "/reservation/drop",
        type: 'POST',
        contentType: "application/json",
        data: {
          meetingId:meetingId,
          start:start,
          end:end
        }
    }).done(this.completed);
});
//改变预约事件结束时间
ReservationCalendarAction.resizeReservation.listen(function(meetingId,end) {
    $.VsAjax({
        url: "/reservation/resize",
        type: 'POST',
        contentType: "application/json",
        data: {
          meetingId:meetingId,
          end:end
        }
    }).done(this.completed);
});
//删除预约事件
ReservationCalendarAction.deleteReservation.listen(function(meetingId) {
    $.VsAjax({
        url: "/reservation/delete",
        type: 'POST',
        contentType: "application/json",
        data: {
          meetingId:meetingId,
        }
    }).done(this.completed);
});




export default ReservationCalendarAction
