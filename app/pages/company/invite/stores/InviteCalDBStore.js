/**
 * 邀请记录下  邀请记录画面编辑对应的store
 * Created by caiwf on 17/11/13.
 */

import Reflux from 'reflux'

import InviteCalendarAction from '../actions/InviteCalendarAction'


let InviteCalDBStore = Reflux.createStore({
    // 监听InviteCalendarAction的所有事件
    listenables: InviteCalendarAction,
    //更新邀请事件完成
    onUpdateInviteCompleted: function(result) {
        this.trigger(result)
    },
});

export default InviteCalDBStore
