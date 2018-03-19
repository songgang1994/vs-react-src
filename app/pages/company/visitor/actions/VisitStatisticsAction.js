/**
 *来访统计action
 * Created by nicheng on 11/06/17.
 */
 //导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'

import Reflux from 'reflux'
//定义Action处理
let VisitStatisticsAction = Reflux.createActions({
     visitViewInited: {},
     getVisit: {asyncResult: true},
     getVisitorType:{asyncResult: true}

});

let _$dtVisit = null;
//获取datatable的api Action处理
VisitStatisticsAction.visitViewInited.listen(function ($dtVisit) {
      _$dtVisit = $dtVisit;
})
//事件刷新列表Action
VisitStatisticsAction.getVisit.listen(function() {
  _$dtVisit.ajax.reload();

});



VisitStatisticsAction.getVisitorType.listen(function(invitevisitor){
  $.VsAjax({
    url:"/visitorInvite/visitorType",
    type:'POST',
    contentType:'application/json',
    data:invitevisitor,

  }).done(this.completed);
});

export default VisitStatisticsAction
