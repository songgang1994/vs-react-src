/**
 * 邀请详细
 * Created by caowj on 2017/11/15
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'

//定义Action处理
let InvitedetailAction = Reflux.createActions({
    // 获取邀请人员的一览id
    getId: {
      // 等价于 children: ['completed', 'failed']
      asyncResult: true
      //children:['success']
    },
});


//获取信息
InvitedetailAction.getId.listen(function(Id) {
    // 所有向后台的Ajax调用都写成$.VsAjax
    $.VsAjax({
        url: "/invitedetail/detail",
        type: 'GET',
        data: {
          ids: Id,
        }
    }).done(this.completed);
});




export default InvitedetailAction
