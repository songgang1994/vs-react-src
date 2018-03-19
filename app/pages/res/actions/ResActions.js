/**
 * Created by griga on 12/8/15.
 */

import Reflux from 'reflux'

let SampleActions = Reflux.createActions({
    add: {},
    edit: {asyncResult: true},
    update: {}
});

SampleActions.add.listen(function (username, password, role) {

    $.ajax({
        url: "http://10.30.100.61:8088/vs-api/user",
        cache: false,
        type: "POST",
        contentType: 'application/json',
        data: {
            loginName: username,
            loginPassword: password,
            role: {admin: 0, normal: 1}[role]
        }
    });

});

SampleActions.edit.listen(function (userId) {
    // $.ajax({
    //     url: "http://10.30.100.61:8088/vs-api/user/" + userId,
    //     cache: false,
    //     type: "GET",
    //     dataType: 'json'
    // }).then(this.completed, this.failed);
    $.getJSON("http://10.30.100.61:8088/vs-api/user/" + userId)
        .then(this.completed, this.failed);
});

SampleActions.update.listen(function (user) {

    $.ajax({
        url: "http://10.30.100.61:8088/vs-api/user/" + user.userId,
        cache: false,
        type: "POST",
        contentType: 'application/json',
        data: user
    }).then(function(resultBean) {
        // TODO: Global Constants
        if (resultBean.resultCode == 0) {

        }
    });

});

export default SampleActions
