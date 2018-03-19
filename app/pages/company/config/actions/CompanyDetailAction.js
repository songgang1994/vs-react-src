/**
 * 公司管理员下  公司详细画面对应的action
 * Created by chenfei on 17/11/3.
 */
import Reflux from 'reflux'

let CompanyDetailAction = Reflux.createActions({
    getCompany: {asyncResult: true},
    updateCompany: {
        children: ['success']
    },
});

//获得公司信息
CompanyDetailAction.getCompany.listen(function () {
  // 所有向后台的Ajax调用都写成$.VsAjax
  var companyId = JSON.parse(localStorage.getItem('user')).companyId
  $.VsAjax({
      url: "/company/companyInfoDto/" + companyId,
      type: 'GET'
      //请求完成 触发此 completed函数
  }).done(this.completed);
});

//更新 公司信息
CompanyDetailAction.updateCompany.listen(function (company) {
    $.VsAjax({
        url: "/company/companyInfoDto/" + company.companyId,
        type: "POST",
        contentType: "application/json",
        data: company
    //更新成功后，触发success
    }).done(this.success);
});


export default CompanyDetailAction
