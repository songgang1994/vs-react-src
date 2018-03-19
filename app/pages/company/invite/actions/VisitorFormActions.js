/**
 * 访客信息画面用action
 * Created by songgang on 10/26/17.
 */
import Reflux from 'reflux'
//导入共通Ajax
import $ from '../../../../../app/com/vs-ajax'
let VisitorFormActions = Reflux.createActions({
  // 获取表单访客信息
  getVisitorInfo:{
    children: ['success']
  },
  addOrUpdVisitorInfo:{
    children: ['success']
  }
});

// 获取访客信息 Action
VisitorFormActions.getVisitorInfo.listen(function(visitorId){
  $.VsAjax({
    url: "/visitor/getVisitorInfoById",
    type: "POST",
    data: {
      visitorId: visitorId
    }
    // 同意后触发子success Action
  }).done(this.success);
});

// 新增/修改 访客信息 Action
VisitorFormActions.addOrUpdVisitorInfo.listen(function(visitor){
  $.VsAjax({
    url: "/visitor/addOrUpdVisitorInfo",
    type: "POST",
    contentType: 'application/json',
    data: {
      visitorId:visitor
    }
    // 同意后触发子success Action
  }).done(this.success);
});

export default VisitorFormActions
