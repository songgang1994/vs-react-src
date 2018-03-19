/**
 * 邀请记录下  邀请记录画面具体信息对应的stores
 * Created by caiwf on 17/11/13.
 */

import Reflux from 'reflux'

import InviteCalendarAction from '../actions/InviteCalendarAction'


let InviteCalDetailStore = Reflux.createStore({
    // 监听InviteCalendarAction的所有事件
    listenables: InviteCalendarAction,
    //获取预约事件完成
    onSearchInviteByIdCompleted: function(result) {
        this.trigger(result)
    },
});

export default InviteCalDetailStore
