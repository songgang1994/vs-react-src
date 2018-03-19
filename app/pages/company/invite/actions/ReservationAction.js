/**
 * 发送邀请下  会议室预约画面对应的action
 * Created by caiwf on 17/11/10.
 */

import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';

//定义Action处理
// Reflux.createActions可以同时定义多个Action
let ReservationAction = Reflux.createActions({
    // 搜索日程，获取日程Action
    searchReservation: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
});

//获取预约信息
ReservationAction.searchReservation.listen(function() {
    // 所有向后台的Ajax调用都写成$.VsAjax
    $.VsAjax({
        url: "/reservation/all",
        type: 'GET'
    }).done(this.completed);
});




export default ReservationAction
