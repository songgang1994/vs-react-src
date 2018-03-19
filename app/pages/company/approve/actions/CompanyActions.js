/**
 * Created by chenfei on 10/26/17.
 */

import Reflux from 'reflux'

let CompanyActions = Reflux.createActions({
    init: {asyncResult: true},
    chooseCompany : {}
});

CompanyActions.init.listen(function () {
    $.getJSON('api/Approve/treeview.json').then(function(data){
        this.setState(data)
    }.bind(this))
      // $.getJSON('api/inbox/inbox.json')
      //     .then(this.completed, this.failed)

      // $.getJSON('http://10.30.100.54:8088/vs-api/util/login/init')
      //     .then(this.completed, this.failed)
});

//选择公司(不能删)
CompanyActions.chooseCompany.listen(function (company) {
    // alert(company.id);

    //目前不需要访问后台
    // $.vsAjax({
    //     url: "/util/login",
    //     type: "POST",
    //     data: {
    //         loginName: loginName,
    //         loginPassword: loginPassword,
    //     }
    // }).done(this.succeed);
});

export default CompanyActions
