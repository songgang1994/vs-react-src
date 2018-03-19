/**
 * 公司信息模态框 对应action
 * Created by chenfei on 17/11/11.
 */
import Reflux from 'reflux'

let CompanyModalAction = Reflux.createActions({
    getCompany: {asyncResult: true},
    insertCompany: {
        children: ['success']
    },
    updateCompany: {
        children: ['success']
    },
});


//插入公司信息
CompanyModalAction.insertCompany.listen(function (company) {
    $.VsAjax({
        url: "/company/companyInfoDto",
        type: "POST",
        contentType: "application/json",
        data: company
    //插入成功后，触发success
    }).done(this.success);
});


//更新 公司信息
CompanyModalAction.updateCompany.listen(function (company) {
    $.VsAjax({
        url: "/company/companyInfoDto/" + company.companyId,
        type: "POST",
        contentType: "application/json",
        data: company
    //更新成功后，触发success
    }).done(this.success);
});


export default CompanyModalAction
