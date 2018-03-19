/**
 * 邀请记录下  邀请记录画面对应的action
 * Created by caiwf on 17/11/13.
 */

import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'
//导入共通函数
import VsUtil from '../../../../../app/com/vs-util';

//定义Action处理
// Reflux.createActions可以同时定义多个Action
let InviteCalendarAction = Reflux.createActions({
    // 搜索日程，获取日程Action
    searchInvite: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
    //搜索邀请记录
    searchInviteById: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
    //更新邀请记录
    updateInvite: {
        // 等价于 children: ['completed', 'failed']
        asyncResult: true
    },
});

//获取邀请信息
InviteCalendarAction.searchInvite.listen(function(companyId,departId,staffId,userType) {
    // 所有向后台的Ajax调用都写成$.VsAjax
    $.VsAjax({
        url: "/inviteRecord/inviteInfo",
        type: 'GET',
        data:{
          companyId:companyId,
          departId:departId,
          staffId:staffId,
          userType:userType
        }
    }).done(this.completed);
});

//获取单个邀请信息
InviteCalendarAction.searchInviteById.listen(function(inviteId) {
    // 所有向后台的Ajax调用都写成$.VsAjax
    $.VsAjax({
        url: "/inviteRecord/inviteInfoById/" + inviteId,
        type: 'GET'
    }).done(this.completed);
});

//更新邀请信息
InviteCalendarAction.updateInvite.listen(function(inviteInfo) {
    // 所有向后台的Ajax调用都写成$.VsAjax
    $.VsAjax({
        url: "/inviteRecord/updateInvite",
        type: 'POST',
        contentType: "application/json",
        data: {
          inviteId:inviteInfo.inviteId,
          inviteDate: inviteInfo.inviteDate,
          inviteBeginTime: inviteInfo.inviteBeginTime,
          inviteEndTime: inviteInfo.inviteEndTime,
          inviteType:inviteInfo.inviteType,
          memo: inviteInfo.memo,
          address: inviteInfo.address
        }
    }).done(this.completed);
});




export default InviteCalendarAction
