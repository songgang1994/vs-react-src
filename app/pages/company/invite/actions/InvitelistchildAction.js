/**
 * 邀请一览action
 * Created by nicheng on 11/06/17.
 */
 //导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'

import Reflux from 'reflux'
//定义Action处理
let InvitelistchildAction = Reflux.createActions({
     inviteViewInited: {},
     getInviteInfo: {asyncResult: true},
     getInviteCheckState: {asyncResult: true}

});

let _$dtVisit = null;
//获取datatable的api Action处理
InvitelistchildAction.inviteViewInited.listen(function ($dtVisit) {
      _$dtVisit = $dtVisit;
})
//事件刷新列表Action
InvitelistchildAction.getInviteInfo.listen(function() {
  _$dtVisit.ajax.reload();

});



InvitelistchildAction.getInviteCheckState.listen(function(invitevisitor){
  $.VsAjax({
    url:"/inviteList/checkState",
    type:'POST',
    contentType:'application/json',
    data:invitevisitor,

  }).done(this.completed);
});



export default InvitelistchildAction
