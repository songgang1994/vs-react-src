/**
 * 邀请记录下  邀请记录画面全部信息对应的stores
 * Created by caiwf on 17/11/13.
 */

import Reflux from 'reflux'

import InviteCalendarAction from '../actions/InviteCalendarAction'


let InviteCalListStore = Reflux.createStore({
    // 监听InviteCalendarAction的所有事件
    listenables: InviteCalendarAction,
    //获取预约事件完成
    onSearchInviteCompleted: function(result) {
        this.trigger(result)
    },
});

export default InviteCalListStore
